### T&C Fairness Assessment Demo

Demonstration of generative AI to assess the product T&C based on custom rules specified in the prompt. You can customise the prompt according to your use case, just update the content of files within the prompt directory.

![](App_UI.png)

### Running locally

- Pre-requisites
  - [Node.js](https://nodejs.org/en)
  - Python environment (venv or conda)
    - python 3.10
    - `pip install Flask==3.0.0 openai==0.28.1 python-dotenv==1.0.0`
- Clone this repository
- Rename .env_template to .env and update all values
- Navigate to frontend directory
- From cmd `python app.py`
- From a separate cmd `npm install`
- `npm run dev`
  - Open the URL shown in to web browser window
