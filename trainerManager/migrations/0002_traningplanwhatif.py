# Generated by Django 5.0.1 on 2024-01-22 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trainerManager', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TraningPlanWhatIf',
            fields=[
                ('plan_id', models.IntegerField(primary_key=True, serialize=False)),
                ('model_id', models.IntegerField()),
                ('symbol', models.CharField(max_length=45)),
                ('execution_step', models.IntegerField()),
                ('what_if_id', models.IntegerField()),
                ('start_train_date', models.DateTimeField(blank=True, null=True)),
                ('end_train_date', models.DateTimeField(blank=True, null=True)),
                ('target', models.FloatField(blank=True, null=True)),
                ('test_date', models.DateTimeField(blank=True, null=True)),
                ('probability_threshold', models.FloatField(blank=True, null=True)),
                ('take_profit_threshold', models.FloatField(blank=True, null=True)),
                ('true_positive_pcg', models.FloatField(blank=True, null=True)),
                ('true_positive', models.FloatField(blank=True, null=True)),
                ('false_positive', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'traning_plan_what_if',
                'managed': False,
            },
        ),
    ]
