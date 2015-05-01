import json, csv

details = json.load(open('data/details.json'))
basics = json.load(open('data/basics.json'))

out = open('../data/stages.csv', 'w', newline='')
w = csv.writer(out)

data = details

#header
one = data[0]
header = "addresse,branche,branche_abbrev,company,description,etudiant,niveau" \
    ",niveau_abbrev,num,semestre,semestre_annee,sujet,tuteur".split(',')
print(header)
w.writerow(header)

#content
for attrs in data:
    if attrs["stage_reel"]:
        w.writerow(list(attrs[x] for x in header))

out.close()
