# Generated by Django 2.0 on 2018-09-07 02:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('routines', '0006_auto_20180907_0212'),
    ]

    operations = [
        migrations.AddField(
            model_name='session',
            name='user',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, to='routines.User'),
            preserve_default=False,
        ),
    ]
