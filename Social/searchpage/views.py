from django.shortcuts import render

# Create your views here.
def everything(request):
    return render(request, 'search.html', {'range': range(5)})