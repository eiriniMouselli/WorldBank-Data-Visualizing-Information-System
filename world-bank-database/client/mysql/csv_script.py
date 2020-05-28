




#gia na paraxthei to M.csv
#terminal: python3 csv_script.py > M.csv
#reading files

import csv

namesOfCsv={'brasil.csv','cyprus.csv','denmark.csv','estonia.csv','greece.csv','hong kong.csv','italy.csv','jamaica.csv','australia.csv','france.csv'}
print(f'"C_CODE","I_CODE","YEAR","MEASUREMENTS"')
for name in namesOfCsv:
    with open(name) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
                codes=['SP.POP.TOTL','SP.DYN.LE00.IN','NY.GDP.MKTP.KD.ZG','NY.GNP.PCAP.CD','SP.DYN.CDRT.IN','SP.DYN.CBRT.IN',
                       'SP.POP.0014.TO','SP.DYN.TFRT.IN','SP.POP.1564.TO','SP.POP.65UP.TO']
                years=[1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970,
                 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987,
                  1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997,
                 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]
                j=-1
                while j<9:
                    j+=1
                    if codes[j] in row:
                        i=0
                        while i<58:                           
                            if row[4+i] is not "" or None:
                                print(f'{row[1]},{row[3]},{years[i]},{row[4+i]}')
                            i+=1






