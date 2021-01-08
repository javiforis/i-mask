"""
    Cuando cambie algo del script hay que añadir las líneas que antes tengan:

    # NEED TO BE ADDED
"""

# cargo librerias
from PIL import Image
import pytesseract as tess
import os
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd

# NEED TO BE ADDED
import json
# NEED TO BE ADDED
import sys

# NEED TO BE ADDED
tess.pytesseract.tesseract_cmd = r'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'



# creo la expresion que vectorizara
palabras_clave = ['no reutilizable 4 horas 8 horas lavar 25 veces 0065 0064 fpp2 fpp1 fpp3 nr 149 14683 quirurgica higienica']

vectorizer = CountVectorizer(binary = True, ngram_range = (1, 2), token_pattern = '(?u)\\b\\w+\\b')
vectorizer.fit(palabras_clave)

def lector(vectorizador, direccion_image):
    
    # diccionario con el output 
    resultados = {"Clase" : None,
                  "Reut o no" : None, 
                 "Uso" : None,
                 "Certificados" : None,
                 "Eficacia" : None}
    # cargo imagen

    imagen = Image.open(direccion_image)
    
    # la convierto en texto

    texto = tess.image_to_string(imagen)
    
    # limpio el texto

    texto = ' '.join(texto.split())

    # meto el texto en una lista (requerimiento del vectorizador)
    lista = []
    lista.append(texto)
    
    # la encajo contra el vectorizador

    lista_vectorizada = vectorizador.transform(lista)
    
    # FUNCION
    
    # 1 NIVEL: comprobar epi/quirurg/hig
    
    #EPI: 
    if (lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1) or\
    (lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1) or\
    (lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp3']][0] == 1):
        resultados["Clase"] = "EPI"
        
        # 2 NIVEL: reutilizable. O quiza asumir reutilizable
        # No Reutilizable
        if (lista_vectorizada.toarray()[:, vectorizador.vocabulary_['nr']][0] == 1) or\
        (lista_vectorizada.toarray()[:, vectorizador.vocabulary_['no reutilizable']][0] == 1):
            resultados["Reut o no"] = "No reutilizable"
            
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO
            if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['149']][0] == 1:
                resultados["Certificados"] = "UNE-EN 149:2001+A1:2010"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
                
                 # 4 NIVEL: DURACION
                    
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
                    
                # 4 NIVEL: DURACION    
                # duracion no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
                    

            # 3 NIVEL: CERTIFICADO                    
            # NO CERTIFICADO
            else:
                resultados["Certificados"] = "No identificado"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
                
                 # 4 NIVEL: DURACION
                
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
                    
                # duracion no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
                    



        # 2 NIVEL: reutilizable. O quiza asumir reutilizable
        # Reutilizable
        else:  # quiza cabria anadir condicion para identificar reutilizable, no simple else
            resultados["Reut o no"] = "Reutilizable"
            
            
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO
            if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['149']][0] == 1:
                resultados["Certificados"] = "UNE-EN 149:2001+A1:2010"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
                    

            # 3 NIVEL: CERTIFICADO                    
            # NO CERTIFICADO
            else:
                resultados["Certificados"] = "No identificado"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"


        
    # 1 NIVEL: comprobar epi/quirurg/hig       
    #QUIRURGICA:    
    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['quirurgica']][0] == 1:
        resultados["Clase"] = "Quirurgica"
        
        # 2 NIVEL: reutilizable. O quiza asumir no reutilizable
        # No Reutilizable
        if (lista_vectorizada.toarray()[:, vectorizador.vocabulary_['nr']][0] == 1) or\
        (lista_vectorizada.toarray()[:, vectorizador.vocabulary_['no reutilizable']][0] == 1):
            resultados["Reut o no"] = "No reutilizable"
            
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO
            if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['14683']][0] == 1:
                resultados["Certificados"] = "UNE-EN 14683:2019+AC:2019"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siembre misma
                    resultados["Eficacia"] = ">95%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    

            # 3 NIVEL: CERTIFICADO                    
            # NO CERTIFICADO
            else:
                resultados["Certificados"] = "No identificado"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    



        # 2 NIVEL: reutilizable. O quiza asumir reutilizable
        # Reutilizable
        else:  # quiza cabria anadir condicion para identificar reutilizable, no simple else
            resultados["Reut o no"] = "Reutilizable"
            
            
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO
            if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['14683']][0] == 1:
                resultados["Certificados"] = "UNE-EN 14683:2019+AC:2019"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    

            # 3 NIVEL: CERTIFICADO                    
            # NO CERTIFICADO
            else:
                resultados["Certificados"] = "No identificado"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"

    
    # 1 NIVEL: comprobar epi/quirurg/hig
    #HIGIENICA:    
    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['higienica']][0] == 1:
        resultados["Clase"] = "Higienica"

        # 2 NIVEL: reutilizable. O quiza asumir no reutilizable
        # No Reutilizable
        if (lista_vectorizada.toarray()[:, vectorizador.vocabulary_['nr']][0] == 1) or\
        (lista_vectorizada.toarray()[:, vectorizador.vocabulary_['no reutilizable']][0] == 1):
            resultados["Reut o no"] = "No reutilizable"
            
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO 64
            if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['0064']][0] == 1:
                resultados["Certificados"] = "UNE 0064: 2020"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siembre misma
                    resultados["Eficacia"] = ">95%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                   
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO 65
            elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['0065']][0] == 1:
                resultados["Certificados"] = "UNE 0065: 2020"
                resultados["Reut o no"] = "Reutilizable" # porque toda 0065 es reutilizable, backstop
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siembre misma
                    resultados["Eficacia"] = ">90%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">90%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">90%"
                    


            # 3 NIVEL: CERTIFICADO                    
            # NO CERTIFICADO
            else:
                resultados["Certificados"] = "No identificado"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = "No identificada"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = "No identificada"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = "No identificada"
                    



        # 2 NIVEL: reutilizable. O quiza asumir reutilizable
        # Reutilizable
        else:  # quiza cabria anadir condicion para identificar reutilizable, no simple else
            resultados["Reut o no"] = "Reutilizable"
            
            
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO
            if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['14683']][0] == 1:
                resultados["Certificados"] = "UNE-EN 14683:2019+AC:2019"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    

            # 3 NIVEL: CERTIFICADO                    
            # NO CERTIFICADO
            else:
                resultados["Certificados"] = "No identificado"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
 
        
    # 1 NIVEL: comprobar epi/quirurg/hig   
    #CLASE NO ID    
    else:
        resultados["Clase"] = "Clase no identificada"
        
        # 2 NIVEL: reutilizable. O quiza asumir no reutilizable
        # No Reutilizable
        if (lista_vectorizada.toarray()[:, vectorizador.vocabulary_['nr']][0] == 1) or\
        (lista_vectorizada.toarray()[:, vectorizador.vocabulary_['no reutilizable']][0] == 1):
            resultados["Reut o no"] = "No reutilizable"
            
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADOS
            if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['0064']][0] == 1:
                resultados["Certificados"] = "UNE 0064: 2020"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siembre misma
                    resultados["Eficacia"] = ">95%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                   
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO 65
            elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['0065']][0] == 1:
                resultados["Certificados"] = "UNE 0065: 2020"
                resultados["Reut o no"] = "Reutilizable" # porque toda 0065 es reutilizable, backstop
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siembre misma
                    resultados["Eficacia"] = ">90%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">90%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">90%"
                    
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO QUIRURG
            elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['14683']][0] == 1:
                resultados["Certificados"] = "UNE-EN 14683:2019+AC:2019"
                resultados['Clase'] = 'Quirurgica'
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siembre misma
                    resultados["Eficacia"] = ">95%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"

            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO EPI
            elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['149']][0] == 1:
                resultados["Certificados"] = "UNE-EN 149:2001+A1:2010"
                resultados['Clase'] = 'EPI'
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
     

            # 3 NIVEL: CERTIFICADO                    
            # NO CERTIFICADO
            else:
                resultados["Certificados"] = "No identificado"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = "No identificada"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = "No identificada"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = "No identificada"
                    
        # 2 NIVEL: reutilizable. O quiza asumir no reutilizable
        # No Reutilizable
        else:
            resultados["Reut o no"] = "Reutilizable"
            
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADOS
            if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['0064']][0] == 1:
                resultados["Certificados"] = "UNE 0064: 2020"
                resultados["Reut o no"] = "No reutilizable"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siembre misma
                    resultados["Eficacia"] = ">95%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                   
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO 65
            elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['0065']][0] == 1:
                resultados["Certificados"] = "UNE 0065: 2020"
                resultados["Reut o no"] = "Reutilizable" # porque toda 0065 es reutilizable, backstop
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siembre misma
                    resultados["Eficacia"] = ">90%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">90%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">90%"
                    
            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO QUIRURG
            elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['14683']][0] == 1:
                resultados["Certificados"] = "UNE-EN 14683:2019+AC:2019"
                resultados['Clase'] = 'Quirurgica'
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siembre misma
                    resultados["Eficacia"] = ">95%"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = ">95%"

            # 3 NIVEL: CERTIFICADO
            # CERTIFICADO EPI
            elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['149']][0] == 1:
                resultados["Certificados"] = "UNE-EN 149:2001+A1:2010"
                resultados['Clase'] = 'EPI'
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia
                    if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp1']][0] == 1:
                        resultados["Eficacia"] = "78%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "92%"
                    elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['fpp2']][0] == 1:
                        resultados["Eficacia"] = "98%"
                    else:
                        resultados["Eficacia"] = "No identificado"
     

            # 3 NIVEL: CERTIFICADO                    
            # NO CERTIFICADO
            else:
                resultados["Certificados"] = "No identificado"
                
                # 4 NIVEL: DURACION
                
                # 8 horas
                if lista_vectorizada.toarray()[:, vectorizador.vocabulary_['8 horas']][0] == 1:
                    resultados["Uso"] = "8 horas"
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = "No identificada"
            
                # 4 horas
                elif lista_vectorizada.toarray()[:, vectorizador.vocabulary_['4 horas']][0] == 1:
                    resultados["Uso"] = "4 horas"
                    
                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = "No identificada"
                    
                # no especificada
                else:
                    resultados["Uso"] = "Duracion no especificada"

                    
                    # 5 NIVEL: Eficacia. Siempre misma
                    resultados["Eficacia"] = "No identificada"
                    

            
    return resultados

# NEED TO BE ADDED
print(json.dumps(lector(vectorizer, direccion_image= sys.argv[1])))