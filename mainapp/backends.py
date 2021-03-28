from django.contrib.auth.backends import ModelBackend, UserModel
from django.db.models import Q
from django.contrib.auth.models import User

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try: #to allow authentication through phone number or any other field, modify the below statement
            user = UserModel.objects.get(Q(username__iexact=username) | Q(email__iexact=username))
        except UserModel.DoesNotExist:
            UserModel().set_password(password)
        except MultipleObjectsReturned:
            return User.objects.filter(email=username).order_by('id').first()
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    def get_user(self, user_id):
        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None

        return user if self.user_can_authenticate(user) else None

# class EmailAuthBackend(object):
# 	"""
# 	Email Authentication Backend

# 	Allows a user to sign in using an email/password pair rather than
# 	a username/password pair.
# 	"""
 
# 	def authenticate(self, username=None, password=None):
# 	    try:
#             user = User.objects.get(email=username)
#             if user.check_password(password):
#                 return user
	    
#         except User.DoesNotExist:
# 			return None
 
#     def get_user(self, user_id):
#         try:
#             return User.objects.get(pk=user_id)

#         except User.DoesNotExist:
#             return None

class EmailAuthBackend(object):
    def authenticate(self,username=None, password = None):
        try:
            user = User.objects.get(emai=username)
            if user.check_password(password):
                return user

        except User.DoesNotExist:
            return None
    
    def get_user(self,user_id):
        try:
            return User.objects.get(pk = user_id)

        except User.DoesNotExist:
            return None