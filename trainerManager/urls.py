from django.urls import path
from . import views

urlpatterns = [
    path('train-designer/', views.train_designer, name='train_designer'),
    # Add other URL patterns as needed
    path('fetch_load_data/', views.fetch_load_data, name='fetch_load_data'),
    path('fetch_hyperparameters_data/', views.fetch_hyperparameters_data, name='fetch_hyperparameters_data'),
    path('fetch_test_data/', views.fetch_test_data, name='fetch_test_data'),
    path('fetch_trainscope_data/', views.fetch_trainscope_data, name='fetch_trainscope_data'),
    path('fetch_results_data/', views.fetch_results_data, name='fetch_results_data'),


    path('save_data/', views.save_data, name='save_data'),

    path('check_record/', views.check_record, name='check_record'),
    path('update_data/', views.update_data, name='update_data'),
    path('insert_data/', views.insert_data, name='insert_data'),
    path('fetch_data/', views.fetch_data, name='fetch_data'),

]