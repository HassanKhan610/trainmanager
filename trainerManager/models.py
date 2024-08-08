from django.db import models


# Create your models here.

class TraningPlan(models.Model):
    plan_id = models.IntegerField(primary_key=True)  # The composite primary key (plan_id, model_id, symbol, execution_step) found, that is not supported. The first column is selected.
    model_id = models.IntegerField()
    symbol = models.CharField(max_length=45)
    execution_step = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    load_data = models.IntegerField(blank=True, null=True)
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)
    expiration_to_process = models.FloatField(blank=True, null=True)
    expiraion_day_only = models.IntegerField(blank=True, null=True)
    exclude_expiration_day = models.IntegerField(blank=True, null=True)
    min_price_call = models.FloatField(blank=True, null=True)
    min_price_call_sql = models.FloatField(blank=True, null=True)
    max_price_call = models.FloatField(blank=True, null=True)
    max_price_call_sql = models.FloatField(blank=True, null=True)
    min_price_put = models.FloatField(blank=True, null=True)
    min_price_put_sql = models.FloatField(blank=True, null=True)
    max_price_put = models.FloatField(blank=True, null=True)
    max_price_put_sql = models.FloatField(blank=True, null=True)
    train_model = models.IntegerField(blank=True, null=True)
    target = models.FloatField(blank=True, null=True)
    look_forward_window = models.IntegerField(blank=True, null=True)
    look_backward_lstm = models.IntegerField(blank=True, null=True)
    test_start_date = models.DateTimeField(blank=True, null=True)
    test_end_date = models.DateTimeField(blank=True, null=True)
    probability_threshold = models.FloatField(blank=True, null=True)
    take_profit_threshold = models.FloatField(blank=True, null=True)
    architecture = models.CharField(max_length=45, blank=True, null=True, db_comment="#architecture options: 'Simple LSTM', 'Stacked LSTM','Bidirectional LSTM', 'CNN-LSTM','Attention Mechanism with LSTM'")
    optimizer = models.CharField(max_length=45, blank=True, null=True, db_comment='ADAM, ADAM CLIPNORM=1, SGD,RMSPROP')
    learning_rate_var = models.FloatField(blank=True, null=True)
    epochs_var = models.IntegerField(blank=True, null=True)
    batch_size_var = models.IntegerField(blank=True, null=True)
    dropouts_var = models.FloatField(blank=True, null=True)
    lstm_units_var = models.IntegerField(blank=True, null=True)
    cnn_kernel = models.IntegerField(blank=True, null=True)
    cnn_filter = models.IntegerField(blank=True, null=True)
    use_weight = models.IntegerField(blank=True, null=True)
    use_oversampled = models.IntegerField(blank=True, null=True)
    max_rows = models.IntegerField(blank=True, null=True)
    test_by_day = models.IntegerField(blank=True, null=True)
    analyze_features = models.IntegerField(blank=True, null=True)
    run_what_if = models.IntegerField(blank=True, null=True)
    save_what_if = models.IntegerField(blank=True, null=True)
    probability_threshold_range = models.CharField(max_length=45, blank=True, null=True)
    take_profit_threshold_range = models.CharField(max_length=45, blank=True, null=True)
    result_date_time = models.DateTimeField(blank=True, null=True)
    result_train_rows_loaded = models.FloatField(blank=True, null=True)
    result_train_rows_filtered = models.FloatField(blank=True, null=True)
    result_train_accuracy = models.FloatField(blank=True, null=True)
    result_train_true_positive = models.FloatField(blank=True, null=True)
    result_train_false_positive = models.FloatField(blank=True, null=True)
    result_test_row_loaded = models.FloatField(blank=True, null=True)
    result_test_row_filtered = models.FloatField(blank=True, null=True)
    result_test_accuracy = models.FloatField(blank=True, null=True)
    result_test_true_positive = models.FloatField(blank=True, null=True)
    result_test_false_positive = models.FloatField(blank=True, null=True)
    enabled = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'traning_plan'
        unique_together = (('plan_id', 'model_id', 'symbol', 'execution_step'),)


class TraningPlanWhatIf(models.Model):
    plan_id = models.IntegerField(primary_key=True)  # The composite primary key (plan_id, model_id, symbol, execution_step, what_if_id) found, that is not supported. The first column is selected.
    model_id = models.IntegerField()
    symbol = models.CharField(max_length=45)
    execution_step = models.IntegerField()
    what_if_id = models.IntegerField()
    start_train_date = models.DateTimeField(blank=True, null=True)
    end_train_date = models.DateTimeField(blank=True, null=True)
    target = models.FloatField(blank=True, null=True)
    test_date = models.DateTimeField(blank=True, null=True)
    probability_threshold = models.FloatField(blank=True, null=True)
    take_profit_threshold = models.FloatField(blank=True, null=True)
    true_positive_pcg = models.FloatField(blank=True, null=True)
    true_positive = models.FloatField(blank=True, null=True)
    false_positive = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'traning_plan_what_if'
        unique_together = (('plan_id', 'model_id', 'symbol', 'execution_step', 'what_if_id'),)

