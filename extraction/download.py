import requests
import time
import os
import json
import shlex, subprocess
import glob
import random

CURL = """
curl 'https://demeter.utc.fr/pls/portal30/STAGES.HISTORIQUE_STAGES_DYN.show' -H 'Host: demeter.utc.fr' -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:37.0) Gecko/20100101 Firefox/37.0' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://demeter.utc.fr/pls/portal30/STAGES.HISTORIQUE_STAGES_DYN.show' -H 'Cookie: portal30=9.0.3+en-us+us+AMERICA+14FEB95F96C75427E050A8C00A8D4E4D+C5B2ACB49E9742CEC231C597246B61057B5DB19005DCC5515398C070D7B0A8B48A8FD3F8465FBE7B3566E8062280A3B19BA92FB3530A57BEEEA110A7D472CD8228F9CE74E3D02FA424E22D205550E09077FD5FB977A1BE0B; SSO_ID=v1.2~1~7B3F1FEEA03EA226BB1EC756843EFCA0A987382F72B73BA8D995FFA645EFE611E3C45E97ADB96E36CD451D6C90D9BA3E1CF1BDEB5D83BE0830D0B5EB767E6142324FCAA3033448B3B15F0E33CDC61BBFFF4E7EFC1DE3B3007F21BEEB90ECFEE39A007A2A7AA6A933C146C680ED2FEF0DED014621F35CFC84D9B8639AE5652F17E40B6DF11C223757CF6FD2463FD4C18951CFAA439CD3AD8DAE09AB9FE28B350B1A24AA87ED900D0B71E8B51E368277DDE4CA6992D387712200F05BD890D18D8ED5A56F49AD457F13FEDEC0C4BE708560E50202B86514EC86027D2A25C4374281D8CEE91F6A5B75CD8AA1C37B524BFC5F; OSSO_USER_CTX=v1.0~72C5C51A8AA9C1EC4306A051EF770060FD6DBAD6A39BB68BCFC7999A53A9A0966929BE8714B0D2105F39A24D4DEFA1B0A2F3BFD2B88EF9C3053A02EE0F20E88233EEB6C8C4F5DCABD4FAAFDB6C01C0DA462B5A990DFE2F0D12DC4074D7C888969FADE1816584B1B2' -H 'Connection: keep-alive' --data 'p_arg_names=p_action&p_arg_values=3&p_arg_names=p_niveau_stage&p_arg_values=%25&p_arg_names=p_spec&p_arg_values=%25&p_arg_names=p_option&p_arg_values=%25&p_arg_names=p_mot&p_arg_values=%25&p_arg_names=p_periode_debut&p_arg_values=201403&p_arg_names=p_periode_fin&p_arg_values=201403&p_arg_names=p_rech_periode&p_arg_values=semestre&p_arg_names=p_pays&p_arg_values=%25&p_arg_names=p_nom_commune&p_arg_values=&p_arg_names=p_region&p_arg_values=%25&p_arg_names=p_dept&p_arg_values=%25&p_arg_names=p_domaine&p_arg_values=%25&p_arg_names=p_ape&p_arg_values=%25&p_arg_names=p_no_etu&p_arg_values=N&p_arg_names=p_with_etu&p_arg_values=O&p_arg_names=p_prop_id&p_arg_values={num}&p_arg_names=p_scroll&p_arg_values=0'"""

def get_dones():
    l = set()
    for filename in glob.glob('STAGES/*'):
        l.add(filename)
    return l

nums = list(open('data/nums_to_do'))
nums = [int(n.strip()) for n in nums]
random.shuffle(nums)

dones = get_dones()
for i, num in enumerate(nums):
    if num in dones:
        print(num, 'already done')
        continue
    print(num,':', len(dones),'/',len(nums))
    out = subprocess.Popen(CURL.format(num=num), shell=True, stdout=subprocess.PIPE).stdout.read()
    html = out.decode(encoding='iso-8859-15')
    if '<INPUT TYPE="hidden" NAME="p_arg_names" VALUE="p_action">' not in html:
        print('session expired')
        break
    with open("STAGES/{num}".format(num=num),'wb') as f:
        f.write(out)
    print("out len",len(out))
    dones = get_dones()