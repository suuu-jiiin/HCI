from pathlib        import Path #기존에 settings.py 에 있는 코드
from my_settings    import DATABASES, SECRET_KEY

...

DATABASES = DATABASES

SECRET_KEY = SECRET_KEY

ALLOWED_HOSTS = ['*']
INSTALLED_APPS = [
   #  'django.contrib.admin',
   #  'django.contrib.auth',
      'django.contrib.contenttypes',
      'django.contrib.sessions',
      'django.contrib.messages',
      'django.contrib.staticfiles',
      'corsheaders',
      'products',
  ]
 
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
 #  'django.middleware.csrf.CsrfViewMiddleware',
 #  'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]
# 기본 내장된 admin과 csrf, auth를 주석처리

INSTALLED_APPS = [
   'corsheaders'
]

MIDDLEWARE = [
   'corsheaders.middleware.CorsMiddleware',
]
...
...
#REMOVE_APPEND_SLASH_WARNING
APPEND_SLASH = False

##CORS
CORS_ORIGIN_ALLOW_ALL=True
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
)

CORS_ALLOW_HEADERS = (
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
		#만약 허용해야할 추가적인 헤더키가 있다면?(사용자정의 키) 여기에 추가하면 됩니다.
)