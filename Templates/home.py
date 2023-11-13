# streamlit_app.py

import streamlit as st
import requests
import pandas as pd

def scale_to_1_10(number, min_value, max_value):
    # Ensure the range is not zero to avoid division by zero
    if max_value == min_value:
        # Handle the case where the range is zero (or very close to zero)
        # For example, set scaled_number to a default value
        scaled_number = 5.0
    else:
        # Perform Min-Max scaling
        scaled_number = ((number - min_value) / (max_value - min_value)) * 9 + 1

    return scaled_number


def get_financial_data():
    # Make a request to your Django API endpoint to get financial data
    response = requests.get('http://localhost:8000/financial_analysis/')
    if response.status_code == 200:
        return response.json()
    else:
        st.error(f"Error fetching data: {response.text}")
        return []

def main():


    st.title("Financial Analysis with Streamlit")


     # Form for entering financial data
    month = st.date_input("Select Month")
    income = st.number_input("Income", min_value=0.0)
    expenses = st.number_input("Expenses", min_value=0.0)
    debts = st.number_input("Debts", min_value=0.0)
    assets = st.number_input("Assets", min_value=0.0)

    if st.button("Submit"):
        # Create a dictionary with the form data
        form_data = {
            'month': str(month),
            'income': income,
            'expenses': expenses,
            'debts': debts,
            'assets': assets,
        }

        # Send the form data to your Django API endpoint
        response = requests.post('http://localhost:8000/api/financial-data/', data=form_data)

        if response.status_code == 201:
            st.success("Form submitted successfully!")
        else:
            st.error(f"Error submitting form: {response.text}")
    # Get financial data from Django API
    financial_data = get_financial_data()

    # Convert data to a Pandas DataFrame
    df = pd.DataFrame(financial_data)
    

    min_value = df['point'].min()
    max_value = df['point'].max()
    df['scaled_point'] = df['point'].apply(lambda x: scale_to_1_10(x, min_value, max_value))
    
    # Display a bar chart of the calculated points
    st.write("Calculated Points:")
    
    st.bar_chart(df['scaled_point'])

if __name__ == "__main__":
    main()