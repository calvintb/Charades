from django.db import migrations
from django.utils import timezone
import csv
import os

def populate_db(apps, schema_editor):
    Card = apps.get_model('cards', 'Card')

    Card.objects.all().delete()
    for filename in os.listdir("cards/assets"):
        file = open(os.path.join("cards/assets/", filename))
        reader = csv.reader(file)
        next(reader)


        for row in reader:
            print(row)
            if len(row) < 3:
                continue
            if len(row) == 3:
                card = Card(title=row[0],
                            difficulty=row[1],
                            category=row[2],
                            description="")
            if len(row) == 4:
                card = Card(title=row[0],
                            difficulty=row[1],
                            category=row[2],
                            description=row[3])
            card.save()


class Migration(migrations.Migration):

    dependencies = [
            ('cards', '0001_initial'),
            ]
    operations = [
            migrations.RunPython(populate_db),
            ]
