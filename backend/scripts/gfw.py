import requests, json 

API_KEY = 'aa7b5caf-b171-42a3-82ff-084bdbeb7533'

def get_access_token(username, password):
    url = "https://data-api.globalforestwatch.org/auth/token"
    payload = {
        "grant_type": "password",
        "username": username,
        "password": password,
        "scope": ""
    }
    response = requests.post(url, data=payload)
    return response.json()

res = get_access_token("info.ankitpoudel@gmail.com", "Resources@123")
access_token = res['data']['access_token']


def create_api_key(alias, organization, email, domains=[], never_expires=False):
    url = "https://data-api.globalforestwatch.org/auth/apikey"
    payload = {
        "alias": alias,
        "organization": organization,
        "email": email,
        "domains": domains,
        "never_expires": never_expires
    }
    
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {access_token}'  

        # Add any necessary authorization headers if required (e.g., Bearer token)
        # 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' 
    }
    
    response = requests.post(url, json=payload, headers=headers)
    
    if response.status_code == 201:
        print("API Key created successfully:", response.json())
    elif response.status_code == 422:
        print("Validation error:", response.json())
    else:
        print(f"Error {response.status_code}: {response.text}")

# Example usage
# create_api_key(
#     alias="MyAPIKeyy",
#     organization="NRCC",
#     email="info.ankitpoudel@gmail.com",
#     domains=["ankit-poudel.com.np"],
#     never_expires=False  
# )

def get_datasets(access_token, page_number=1, page_size=10):
    url = "https://data-api.globalforestwatch.org/datasets"
    
    headers = {
        'Authorization': f'Bearer {access_token}',  # Include the access token
        'Content-Type': 'application/json'
    }
    
    params = {
        "page[number]": page_number,
        "page[size]": page_size
    }
    
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        return response.json()  # Return the data if the request is successful
    else:
        print(f"Error {response.status_code}: {response.text}")
        return None

# Example usage
if access_token:
    datasets_response = get_datasets(access_token, page_number=1, page_size=5)
    print(datasets_response)  
