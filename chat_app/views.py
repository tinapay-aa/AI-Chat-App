from django.shortcuts import render
from django.http import JsonResponse
from google import genai
import os
from django.views.decorators.csrf import ensure_csrf_cookie

gem = genai.Client(api_key=os.getenv('GEM_API3'))
print(f"API: {os.getenv('GEM_API3')}")
conversation_ids = {}

# Create your views here.
def chat_view(requests):
    return render(requests, 'chat-app/chat.html')

def gem_view(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST requests only'}, status=405)

    message = request.POST.get('user-input', '').strip()

    if not message:
        return JsonResponse({'error': 'Message is empty'}, status=400)

    session_id = request.session.session_key
    if session_id is None:
        request.session.create()
        session_id = request.session.session_key

    previous_id = conversation_ids.get(session_id)

    try:
        params = {
            'model': 'gemini-3.8-flash',
            'input': message,
            'store': True,
        }

        if previous_id:
            params['previous_interaction_id'] = previous_id

        response = gem.interactions.create(**params)

        conversation_ids[session_id] = response.id

        return JsonResponse({'reply': response.output_text})

    except Exception:
        import logging
        logging.exception("Gemini interaction failed")
        return JsonResponse(
            {'error': 'Failed to generate a reply'},
            status=500
        )

@ensure_csrf_cookie
def gem_csrf(requests):
    return JsonResponse({'detail': 'CSRF cookie set'})