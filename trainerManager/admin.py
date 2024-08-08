from django.contrib import admin
from trainerManager.models import TraningPlan

# Register your models here.
# class CustomUserCreationForm(UserCreationForm):
#     class Meta:
#         model = CustomUser
#         fields = ('email', 'first_name', 'last_name', 'password1', 'password2')

# class CustomUserChangeForm(UserChangeForm):
#     class Meta:
#         model = CustomUser
#         fields = ('email', 'first_name', 'last_name')


# class CustomUserAdmin(BaseUserAdmin):
#     form = CustomUserChangeForm
#     add_form = CustomUserCreationForm

#     list_display = ('email', 'first_name', 'last_name', 'is_staff', 'is_superuser')
#     list_filter = ('is_staff', 'is_superuser')
#     fieldsets = (
#         (None, {'fields': ('email', 'password')}),
#         ('Personal Info', {'fields': ('first_name', 'last_name')}),
#         ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'is_staff', 'is_superuser'),
#         }),
#     )
#     search_fields = ('email', 'first_name', 'last_name')
#     ordering = ('email',)

# Now register the new UserModelAdmin...
# admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(TraningPlan)
