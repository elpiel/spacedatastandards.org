# SDS-1 - Resident Space Object (RSO) Catalog Message (RSM)


## Description

The RSM describes metadata about space objects independent of positional data. The message fields are derived from the Satellite Catalog (SATCAT/SATC) message currently produced by the Space Defense Operations Center (SPADOC) system and used as the basis of satellite catalog databases within the United States Government.

## Format

|Predicate |Description |
---|---|
OBJECT_NAME|Satellite Name(s)|
OBJECT_ID|International Designator (YYYY-NNNAAA)|
NORAD_CAT_ID|NORAD Catalog Number|
MULTIPLE_NAMES|Multiple Name Flag|
OBJECT_TYPE|Object type (Payload, Rocket body, Debris, Unknown|
OPS_STATUS_CODE|Operational Status Code|
OWNER|Ownership, typically country or company|
LAUNCH_DATE|Launch Date [year-month-day] (ISO 8601)|
LAUNCH_SITE|Launch Site|
DECAY_DATE|Decay Date, if applicable [year-month-day] (ISO 8601)|
PERIOD|Orbital period [minutes]|
INCLINATION|Inclination [degrees]|
APOGEE|Apogee Altitude [kilometers]|
PERIGEE|Perigee Altitude [kilometers]|
RCS|Radar Cross Section [meters2]; blank if no data available|
DATA_STATUS_CODE|Data status code; blank otherwise|
ORBIT_CENTER|Orbit center|
ORBIT_TYPE|	Orbit type (Orbit, Landing, Impact, Docked to RSO, roundtrip)

## Legacy Format:


    1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567
    1957-001A    00001   D SL-1 R/B                  CIS    1957-10-04  TYMSC  1957-12-01     96.2   65.1     938     214   20.4200

### Legacy Format Description
----

001-011	International Designator

Launch Year (001-004)

Launch of the Year (006-008)

Piece of the Launch (009-011)

014-018	NORAD Catalog Number

020-020	Multiple Name Flag ("M" if multiple names exist; alternate 
names found in satcat-annex.txt)

021-021	Payload Flag ("*" if payload; blank otherwise)

022-022	Operational Status Code

024-047	Satellite Name(s)

R/B(1) = Rocket body, first stage

R/B(2) = Rocket body, second stage

DEB = Debris

PLAT = Platform

Items in parentheses are alternate names

Items in brackets indicate type of object

(e.g., BREEZE-M DEB [TANK] = tank)

An ampersand (&) indicates two or more objects are attached

050-054	Source or Ownership

057-066	Launch Date [year-month-day]

069-073	Launch Site

076-085	Decay Date, if applicable [year-month-day]

088-094	Orbital period [minutes]

097-101	Inclination [degrees]

104-109	Apogee Altitude [kilometers]

112-117	Perigee Altitude [kilometers]

120-127	Radar Cross Section [meters2]; N/A if no data available

130-132	Orbital Status Code

NCE = No Current Elements

NIE = No Initial Elements

NEA = No Elements Available

DOC = Permanently Docked

ISS = Docked to International Space Station

XXN = Central Body (XX) and Orbit Type (N)

AS = Asteroid

EA = Earth (default if blank)

EL = Earth Lagrange

EM = Earth-Moon Barycenter

JU = Jupiter

MA = Mars

ME = Mercury

MO = Moon (Earth)

NE = Neptune

PL = Pluto

SA = Saturn

SS = Solar System Escape

SU = Sun

UR = Uranus

VE = Venus

0 = Orbit

1 = Landing

2 = Impact

3 = Roundtrip

(e.g., SU0 = Heliocentric Orbit, MO2 = Lunar Impact)
