from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.

def chat_view(requests):
    return render(requests, 'chat-app/chat.html')

def gem_view(requests):
    if requests.method == 'POST':
        message = requests.POST.get('user-input')
    
        reply = f'Responding to your message that is {message}'
        
        return JsonResponse({
            'reply': reply
        })
    return JsonResponse({
        'error': 'POST requests only'
    }, status=405)