from bs4 import BeautifulSoup
import json
import glob,re
from pprint import pprint as pp

print('let\'s parse it')

all_stages = []
c = 0
for filename in glob.glob('STAGES/*'):
    n = int(filename.split('/')[1])

    html = open(filename,encoding='iso-8859-15').read()
    soup = BeautifulSoup(html)

    stage_reel = " : Sujet n'ayant pas donn&eacute; lieu &agrave; un stage." not in html

    try:
        sujet = soup.find('h3')
        if not sujet: #"pas d'infos sur le sujet"
            print("no sujet",n)
            continue
        sujet = sujet.text

        if stage_reel:
            branche = soup.find(attrs={'class':'marge100'}).find_next(attrs={'class':'marge100'})
            if not branche: #"personne a pris ce stage"
                print("no branche",n)
                continue
            branche = branche.text.replace('\xa0','').strip()
            if len(branche.split()) < 2:
                if "formatique" not in branche:
                    print('stange branche:', branche[:100])

        if stage_reel:
            niveau = re.search(r'<label>Niveau :</label><.*?>(.*?)<', html)
            if niveau:
                niveau = niveau.group(1)
                niveau = BeautifulSoup(niveau).text
                niveau = niveau.replace('\xa0','')
            else:
                print('no niveau found',n)
                niveau = ""
        else:
            infos = soup.find('li').text.split('\n',2)
            niveau = infos[0]
            branche = infos[1].replace(', s','s').replace('specialité','').strip()

        branche_abbrev = ""
        bl = branche.lower()
        if bl.startswith('inform') \
            or bl.startswith('Ingénierie des Services et des Systèmes'.lower()) \
            or bl.startswith("Sciences et Technologies de l'Information".lower()):
            branche_abbrev = "GI"
        elif bl.startswith('mécan'):
            branche_abbrev = "GM/GSM"
        elif bl.startswith('tronc'):
            branche_abbrev = "TC"
        elif bl.startswith('génie biologique'):
            branche_abbrev = "GB"
        elif bl.startswith('génie des procédés'):
            branche_abbrev = "GP"
        elif bl.startswith('systèmes urbains'):
            branche_abbrev = "GSU"
        else:
            branche_abbrev = "autre"
            print("branche inconnue:", n,branche[:50], "real:",stage_reel)

        niveau_abbrev = ""
        nl = niveau.lower()
        if 'assistant' in nl:
            niveau_abbrev = "TN09"
        elif 'ouvrier' in nl:
            niveau_abbrev = "TN05"
        elif 'fin' in nl:
            niveau_abbrev = "TN10"
        elif 'master' in nl:
            niveau_abbrev = "master"
        elif 'apprenti' in nl:
            niveau_abbrev = "apprentissage"
        elif 'intercul' in nl:
            niveau_abbrev = "interculturel"
        elif 'licence' in nl:
            niveau_abbrev = "licence"
        elif 'hutech' in nl:
            niveau_abbrev = "hutech"
        else:
            niveau_abbrev = "autre"
            print("niveau inconnu:", n,niveau[:30], "real:",stage_reel)

        semestre = soup.find('label').text
        semestre, annee = semestre.split(' ')[:2]

        description = soup.find('textarea').text

        adresse = soup.find(attrs={'class':'groupe left'}).find('p')

        company = soup.find(attrs={'class':'groupe left'}).find('h3').text.replace('\xa0','')

        adresse = str(adresse).replace('<p>','').replace('</p>','').replace('<br/>','\n')
        adresse = '\n'.join(x for x in adresse.split('\n') if x)

        etu = ""
        if stage_reel:
            etu = soup.find(attrs={'class':'groupe left'}).find_next(attrs={'class':'marge100'}).text
            etu = etu.replace('\xa0','')

            if not 2 <= len(etu.split()) <= 5:
                print('strange etu:', etu)

        tuteur = ""
        if stage_reel:
            tuteur = soup.find(attrs={'class':'groupe left'}) \
                     .find_next(attrs={'class':'marge100'}).find_next(attrs={'class':'marge100'})
            if tuteur:
                tuteur = tuteur.text.replace('\xa0','')
                if not 2 <= len(tuteur.split()) <= 5:
                    print('strange tuteur:', tuteur)
            else:
                tuteur = ""

    except Exception as e:
        print(n,'failed')
        raise e

    result = {
        'num':n,
        'sujet':sujet,
        'niveau':niveau,
        'niveau_abbrev': niveau_abbrev,
        'branche':branche,
        'company':company,
        'semestre_annee':int(annee),
        'semestre':semestre[0],
        'description':description,
        'addresse':adresse,
        'etudiant':etu,
        'tuteur':tuteur,
        'stage_reel':stage_reel,
        'branche_abbrev': branche_abbrev,
    }

    all_stages.append(result)

    c += 1
    if c % 100 == 0:
        print("DONE: ",c)

json.dump(all_stages, open('data/details.json','w'), indent=2)

print('parsed', len(all_stages))
