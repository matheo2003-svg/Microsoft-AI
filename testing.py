from openai import AzureOpenAI

client = AzureOpenAI(
    api_key="DeZyHKxzgjloPTF3c1cxhLoTQULrrNYgncBJO2S0una8Ys0j6YiIJQQJ99BEACLArgHXJ3w3AAABACOGOFcW",  # or use os.getenv("AZURE_OPENAI_KEY")
    api_version="2024-04-01-preview",  # required for On Your Data support
    azure_endpoint="https://cooking.openai.azure.com/"
)

response = client.chat.completions.create(
    model="Microsoft.CognitiveServicesOpenAI-20250504052151",  # this is the deployment name from Azure
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What's the weather like in Cape Town?"}
    ]
)

print(response.choices[0].message.content)
