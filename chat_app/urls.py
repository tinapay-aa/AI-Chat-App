from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.chat_view, name='chat_view'),
    path('gem/', views.gem_view, name='gem_view'),
    path('', include('pwa.urls'))
]
