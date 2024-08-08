from django.shortcuts import render
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
import traceback  # Import traceback module
from django.shortcuts import HttpResponse
from django.db import IntegrityError
from django.views.decorators.http import require_GET
from django.core.serializers import serialize


# Create your views here.
from .models import TraningPlan
# from .models import TraningPlan, LoadDataRow, HyperparameterRow, TestDataRow, TrainScopeRow, ResultsRow


# def train_designer(request):
#     # Example: Retrieve all rows from the TraningPlan table
#     training_plans = TraningPlan.objects.all()

    

    

#     context = {
#         'training_plans': training_plans
#     }

#     return render(request, 'train_designer.html', context)

def train_designer(request):
    # Fetch data for Descriptor Rows table
    descriptor_rows = TraningPlan.objects.all()

    # # Fetch data for Load Data table
    # load_data_rows = LoadDataRow.objects.all()

    # # Fetch data for other tables based on the selected row (dummy data for illustration)
    # hyperparameter_rows = HyperparameterRow.objects.all()
    # test_data_rows = TestDataRow.objects.all()
    # train_scope_rows = TrainScopeRow.objects.all()
    # results_rows = ResultsRow.objects.all()

    context = {
        'descriptor_rows': descriptor_rows,
        # 'load_data_rows': load_data_rows,
        # 'hyperparameter_rows': hyperparameter_rows,
        # 'test_data_rows': test_data_rows,
        # 'train_scope_rows': train_scope_rows,
        # 'results_rows': results_rows,
    }

    return render(request, 'train_designer.html', context)


def fetch_load_data(request):
    # Get parameters from the request
    model_id = request.GET.get('model_id')
    symbol = request.GET.get('symbol')
    plan_id = request.GET.get('plan_id')
    execution_step = request.GET.get('execution_step')

    print(f"Received parameters: model_id={model_id}, symbol={symbol}, plan_id={plan_id}, execution_step={execution_step}")

    # Fetch data from the database based on the parameters
    try:
        row_data = TraningPlan.objects.get(
            model_id=model_id,
            symbol=symbol,
            plan_id=plan_id,
            execution_step=execution_step
        )

        # Convert the model data to a dictionary for JSON response
        row_data_dict = model_to_dict(row_data)

        return JsonResponse({'success': True, 'row_data': row_data_dict})

    except TraningPlan.DoesNotExist:
        print("Row not found in the database.")
        return JsonResponse({'success': False, 'message': 'Row not found'})


def fetch_hyperparameters_data(request):
    # Get parameters from the request
    model_id = request.GET.get('model_id')
    symbol = request.GET.get('symbol')
    plan_id = request.GET.get('plan_id')
    execution_step = request.GET.get('execution_step')

    print(f"Received parameters: model_id={model_id}, symbol={symbol}, plan_id={plan_id}, execution_step={execution_step}")

    # Fetch data from the database based on the parameters
    try:
        row_data = TraningPlan.objects.get(
            model_id=model_id,
            symbol=symbol,
            plan_id=plan_id,
            execution_step=execution_step
        )

        # Convert the model data to a dictionary for JSON response
        row_data_dict = model_to_dict(row_data)

        return JsonResponse({'success': True, 'row_data': row_data_dict})

    except TraningPlan.DoesNotExist:
        print("Row not found in the database.")
        return JsonResponse({'success': False, 'message': 'Row not found'})


def fetch_test_data(request):
    # Get parameters from the request
    model_id = request.GET.get('model_id')
    symbol = request.GET.get('symbol')
    plan_id = request.GET.get('plan_id')
    execution_step = request.GET.get('execution_step')

    print(f"Received parameters: model_id={model_id}, symbol={symbol}, plan_id={plan_id}, execution_step={execution_step}")

    # Fetch data from the database based on the parameters
    try:
        row_data = TraningPlan.objects.get(
            model_id=model_id,
            symbol=symbol,
            plan_id=plan_id,
            execution_step=execution_step
        )

        # Convert the model data to a dictionary for JSON response
        row_data_dict = model_to_dict(row_data)

        return JsonResponse({'success': True, 'row_data': row_data_dict})

    except TraningPlan.DoesNotExist:
        print("Row not found in the database.")
        return JsonResponse({'success': False, 'message': 'Row not found'})


def fetch_trainscope_data(request):
    # Get parameters from the request
    model_id = request.GET.get('model_id')
    symbol = request.GET.get('symbol')
    plan_id = request.GET.get('plan_id')
    execution_step = request.GET.get('execution_step')

    print(f"Received parameters: model_id={model_id}, symbol={symbol}, plan_id={plan_id}, execution_step={execution_step}")

    # Fetch data from the database based on the parameters
    try:
        row_data = TraningPlan.objects.get(
            model_id=model_id,
            symbol=symbol,
            plan_id=plan_id,
            execution_step=execution_step
        )

        # Convert the model data to a dictionary for JSON response
        row_data_dict = model_to_dict(row_data)

        return JsonResponse({'success': True, 'row_data': row_data_dict})

    except TraningPlan.DoesNotExist:
        print("Row not found in the database.")
        return JsonResponse({'success': False, 'message': 'Row not found'})


def fetch_results_data(request):
    # Get parameters from the request
    model_id = request.GET.get('model_id')
    symbol = request.GET.get('symbol')
    plan_id = request.GET.get('plan_id')
    execution_step = request.GET.get('execution_step')

    print(f"Received parameters: model_id={model_id}, symbol={symbol}, plan_id={plan_id}, execution_step={execution_step}")

    # Fetch data from the database based on the parameters
    try:
        row_data = TraningPlan.objects.get(
            model_id=model_id,
            symbol=symbol,
            plan_id=plan_id,
            execution_step=execution_step
        )

        # Convert the model data to a dictionary for JSON response
        row_data_dict = model_to_dict(row_data)

        return JsonResponse({'success': True, 'row_data': row_data_dict})

    except TraningPlan.DoesNotExist:
        print("Row not found in the database.")
        return JsonResponse({'success': False, 'message': 'Row not found'})


@require_POST
def save_data(request):
    try:
        data = request.POST  # Assuming the data is sent as POST parameters
        symbol = data.get('symbol', '')
        model_id = data.get('model_id', '')
        plan_id = data.get('plan_id', '')
        execution_step = data.get('execution_step', '')

        try:
            # Check if the record already exists
            record = TraningPlan.objects.get(
                symbol=symbol,
                model_id=model_id,
                plan_id=plan_id,
                execution_step=execution_step
            )
            
            # Update existing record
            # Update other fields as needed

        except TraningPlan.DoesNotExist:
            # Create a new record if it does not exist
            record = TraningPlan(
                symbol=symbol,
                model_id=model_id,
                plan_id=plan_id,
                execution_step=execution_step,
                # Add other fields as needed
            )

        # Save the record
        try:
            record.save()
            return JsonResponse({'success': True})
        except IntegrityError as e:
            if '1062' in str(e):
                return JsonResponse({'success': False, 'error': 'Duplicate entry error. Record already exists.'})
            else:
                return JsonResponse({'success': False, 'error': str(e)})

    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})

@require_GET
def check_record(request):
    symbol = request.GET.get('symbol', '')
    model_id = request.GET.get('model_id', '')
    plan_id = request.GET.get('plan_id', '')
    execution_step = request.GET.get('execution_step', '')

    # Perform a database query to check if the record exists
    record_exists = TraningPlan.objects.filter(
        symbol=symbol,
        model_id=model_id,
        plan_id=plan_id,
        execution_step=execution_step
    ).exists()

    return JsonResponse({'exists': record_exists})

@require_POST
def update_data(request):
    try:
        data = json.loads(request.body)
        symbol = data.get('symbol', '')
        model_id = data.get('model_id', '')
        plan_id = data.get('plan_id', '')
        execution_step = data.get('execution_step', '')

        # Perform a database update with the new data
        TraningPlan.objects.filter(
            symbol=symbol,
            model_id=model_id,
            plan_id=plan_id,
            execution_step=execution_step
        ).update(**data)

        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})
    

@require_POST
def insert_data(request):
    try:
        data = json.loads(request.body)

        # Perform a database insert with the new data
        TraningPlan.objects.create(**data)

        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})


@require_GET
def fetch_data(request):
    model_id = request.GET.get('model_id')
    symbol = request.GET.get('symbol')
    plan_id = request.GET.get('plan_id')
    execution_step = request.GET.get('execution_step')

    try:
        # Fetch data from the database based on the provided parameters
        data = TraningPlan.objects.get(
            model_id=model_id,
            symbol=symbol,
            plan_id=plan_id,
            execution_step=execution_step
        )

        # Use Django serializers to convert the model data to JSON
        serialized_data = serialize('json', [data])

        return JsonResponse({'success': True, 'row_data': serialized_data})
    except TraningPlan.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Record not found'})
    

