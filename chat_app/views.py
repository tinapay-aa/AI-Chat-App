from django.shortcuts import render
from django.http import JsonResponse
from google import genai
import os

gem = genai.Client(api_key=os.getenv('GEM_API'))
print(os.getenv('GEM_API'))
history = []

# Create your views here.
def chat_view(requests):
    return render(requests, 'chat-app/chat.html')

def gem_view(requests):
    if requests.method == 'POST':
        message = requests.POST.get('user-input')
        
        history.append({
            "type": "user_input",
            "content": [{"type": "text", "text": message}]
        })
        
        reply = gem.interactions.create(
            model='gemini-3.8-flash',
            store=False,
            input=history
        )
        reply = reply.output_text
        
        # reply = message
        
        return JsonResponse({
            'reply': reply
        })
        
    return JsonResponse({
        'error': 'POST requests only'
    }, status=405)