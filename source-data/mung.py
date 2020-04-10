#!/usr/bin/env python3
import sys
import os
import json
import urllib.request
import shutil
import logging
import datetime
from pathlib import Path

API_PATH = Path("/root/covid/api")
SOURCE_DATA_PATH = Path("/root/covid/source-data")
input_file_path = SOURCE_DATA_PATH / "guardian.json"
output_file_path = API_PATH / "data.json"


def load_sa_data():
    """Load data from source file return data for SA only."""
    logging.debug(f"Input file path: {input_file_path}")
    with open(input_file_path, "r") as f:
        data = json.load(f)

    updates = data["sheets"]["updates"]
    sa = [observation for observation in updates if observation["State"] == "SA" and observation["Update Source"] == "media release"]

    return sa


def parse_for_daily_data(observations):
    """Pluck case count data from list of observations, add growth rate
    growth factor and day-on-day doubling rate. Return list of modified options."""
    cumulative_cases = 0
    cases_yesterday = 0
    previous_observation = {}
    results = []

    for index, observation in enumerate(observations):
        data = {}
        date_string = observation["Date"]
        date = datetime.datetime.strptime(date_string, "%d/%m/%Y")

        if previous_observation is not None and "dateObj" in previous_observation:
            delta = date - previous_observation["dateObj"]
            days_since_previous_observation = delta.days
        else:
            days_since_previous_observation = 0
        if observation["Cumulative case count"].strip():
            total_cases = int(observation["Cumulative case count"])
        else:
            continue

        # Calculate new cases
        daily_cases = total_cases - cumulative_cases

        # Calculate growth factor
        growth_factor = calculate_growth_factor(
            daily_cases, cases_yesterday, units=days_since_previous_observation
        )

        # Update tracing variables
        cases_yesterday = daily_cases
        cumulative_cases = total_cases

        # Build a result dictionary
        data["date"] = date_string
        data["dateObj"] = date
        data["index"] = index
        data["daysSincePreviousObservation"] = days_since_previous_observation
        data["newCases"] = daily_cases
        data["cumulativeCases"] = total_cases
        data["growthFactor"] = growth_factor
        results.append(data)

        previous_observation = data

    return results


def get_index_of_first_day_above_100_cases(observations):
    """"Given a list of observations, return the index of the first observation with 
    100 or more cumulative cases."""
    index_of_first_day_above_100_cases = None
    for index, observation in enumerate(observations):
        total_cases = observation["cumulativeCases"]

        if total_cases >= 100 and index_of_first_day_above_100_cases is None:
            return index


def calculate_growth_rate(present, past, units=1):
    if past == 0:
        return None
    return (present - past) / (past * units)


def calculate_growth_factor(present, past, units=1):
    if past * units == 0:
        return None
    logging.debug(f"Present: {present}, Past: {past}, Units: {units}")
    return present / (past * units)


def calculate_doubling_rate(growth_rate):
    if growth_rate is None:
        return None
    if growth_rate == 0:
        return 0
    return 70 / int(100 * growth_rate)


def add_additional_calculations(observations):
    """Add growth rate and doubling rates since the first day 100 cases were observed."""
    first_day = observations[0]
    first_day_cumulative_count = first_day["cumulativeCases"]
    rest = [
        {
            **el,
            "growthRateSince100Cases": calculate_growth_rate(
                el["cumulativeCases"],
                first_day_cumulative_count,
                units=(el["dateObj"] - first_day["dateObj"]).days,
            ),
            "doublingRateSince100Cases": calculate_doubling_rate(
                calculate_growth_rate(
                    el["cumulativeCases"],
                    first_day_cumulative_count,
                    units=(el["dateObj"] - first_day["dateObj"]).days,
                )
            ),
        }
        for el in observations[1:]
    ]
    return [first_day] + rest


def add_additional_calculations_after_100_cases(observations, index):
    prior = observations[:index]
    subsequent = observations[index:]
    subsequent = add_additional_calculations(subsequent)
    return prior + subsequent


def download_json_file():
    """Redownload source data"""
    GUARDIAN_DATASET_URI = "https://interactive.guim.co.uk/docsdata/1q5gdePANXci8enuiS4oHUJxcxC13d6bjMRSicakychE.json"
    logging.debug(f"Input file path: {input_file_path}")
    # Download the file from `url` and save it locally under `file_name`:
    with urllib.request.urlopen(GUARDIAN_DATASET_URI) as response, open(
        input_file_path, "wb"
    ) as out_file:
        shutil.copyfileobj(response, out_file)


def save_data_to_file(results):
    """"Save calculated data to data.json"""
    logging.debug(f"Output file path: {output_file_path}")
    with open(output_file_path, "w") as f:
        json.dump(results, f)


def remove_date_time_key(results):
    for result in results:
        del result["dateObj"]
    return results


def calculate_latest_reporting_date(observations):
    latest_observation = observations[-1]

    if "Time" in latest_observation and latest_observation["Time"].strip() != "":
        dt = datetime.datetime.strptime(
            f"{latest_observation['Date']} {latest_observation['Time']}",
            "%d/%m/%Y %H:%M",
        )
    else:
        dt = datetime.datetime.strptime(
            f"{latest_observation['Date']} 00:00", "%d/%m/%Y %H:%M"
        )
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")


def compose_final_object(results, reported_at):
    return {
        "observations": results,
        "reportedAt": reported_at,
        #    "firstDayAbove100Cases": results[index_of_first_day_above_100_cases]["date"],
    }


def main():
    # Configure logging
    logging_level = logging.INFO
    lower_case_args = [arg.lower() for arg in sys.argv]
    if "--debug" in lower_case_args:
        logging_level = logging.DEBUG
    logging.basicConfig(level=logging_level)

    # Set paths based on input arguments
    if "-if" in lower_case_args:
        global input_file_path
        arg_index = lower_case_args.index("-if")
        file_path_index = lower_case_args[arg_index + 1]
        input_file_path = file_path_index

    if "-of" in lower_case_args:
        global output_file_path
        arg_index = lower_case_args.index("-of")
        file_path_index = lower_case_args[arg_index + 1]
        output_file_path = file_path_index

    # Re-download data from source if requested
    if "--update" in lower_case_args:
        logging.info("Downloading data file...")
        download_json_file()
        logging.info("Downloaded.")

    # Start processing
    logging.info("Starting processing...")
    observations = load_sa_data()
    valid_observations = [
        o
        for o in observations
        if "Cumulative case count" in o and o["Cumulative case count"].strip()
    ]
    reported_at = calculate_latest_reporting_date(valid_observations)
    parsed_observations = parse_for_daily_data(valid_observations)
    # index_of_first_day_above_100_cases = get_index_of_first_day_above_100_cases(parsed_observations)

    results = remove_date_time_key(parsed_observations)
    final_object = compose_final_object(results, reported_at)

    save_data_to_file(final_object)
    logging.debug(final_object)
    logging.info("Completed processing.")


if __name__ == "__main__":
    main()
