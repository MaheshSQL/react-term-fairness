#------------Imports---------------
import os
import openai
from dotenv import load_dotenv

import hashlib

import requests
import json
import logging

from flask import Flask, Response, request, jsonify, send_from_directory

logging.basicConfig(level=logging.ERROR)


load_dotenv()

app = Flask(__name__)

'''
Initialise environment variables
'''
def setEnv():
    try:
        openai.api_type = os.getenv('OPENAI_API_TYPE')
        openai.api_base = os.getenv('OPENAI_API_BASE')
        openai.api_version = os.getenv('API_VERSION')
        openai.api_key = os.getenv("OPENAI_API_KEY")
        
        return True
    except Exception as e:
        logging.error(f'Error setEnv(): {e}')    
        return False
    
'''
Read text file
'''
def readText(file_path):
    try:
        file_contents = ''

        with open(file_path, 'r') as file:  

            # Read the entire contents of the file
            file_contents = file.read()  
        
        return file_contents
    except Exception as e:
        logging.error(f'Error readText(): {e}')    
        return ''
    
'''
Get Chat completion.
'''
def getChatCompletion(system_init_text,prompt_template,user_input, aoai_chat_model, aoai_chat_model_temperature, aoai_chat_model_max_tokens, aoai_chat_model_top_p):
    try:
        #Create ChatCompletion
        conversation = []
        conversation.append({"role": "system", "content": system_init_text })
        conversation.append({"role": "user", "content": prompt_template + ' ' + user_input })        

        response = openai.ChatCompletion.create(
            engine=aoai_chat_model, # The deployment name you chose when you deployed the ChatGPT model
            messages=conversation,
            temperature=aoai_chat_model_temperature,
            max_tokens=aoai_chat_model_max_tokens,
            top_p=aoai_chat_model_top_p
            )
        
        query_result = response['choices'][0]['message']['content']
        # print(f'response:{response}')
        return query_result
    
    except Exception as e:        
        logging.error(f'Error getChatCompletion(): {e}')        
        return None

#Set env variables
setEnv()


# Variables
aoai_chat_model_temperature = 0.0
aoai_chat_model_max_tokens = 300
aoai_chat_model_top_p = 0.20
OPENAI_DEPLOYMENT = os.getenv("OPENAI_DEPLOYMENT")
prompt = readText('./prompt/prompt.txt')
system_message = readText('./prompt/system_message.txt')

# print(system_message)

# user_input = '''On the scheduled date of Service, only we can decide scope of work 
# to perform and sign a service repair order (Service Repair Order).'''

@app.route("/assess", methods=["POST"])
def assessTerm():
    query_result = ''

    if request.method == 'POST':
        user_input = request.json
        print(f'assessTerm() - user_input:{user_input["user_input"]}')

        query_result = getChatCompletion(
        system_init_text=system_message,
        prompt_template=prompt,
        user_input = user_input["user_input"],                
        aoai_chat_model=OPENAI_DEPLOYMENT, 
        aoai_chat_model_temperature=aoai_chat_model_temperature, 
        aoai_chat_model_max_tokens=aoai_chat_model_max_tokens, 
        aoai_chat_model_top_p=aoai_chat_model_top_p)
    
    return jsonify(query_result), 200

if __name__ == "__main__":
    app.run(debug=True)
    # app.run()