<script lang="ts">
  import logo from "./assets/svelte.png";
  import Counter from "./lib/Counter.svelte";
  import flatc from "./external/flatc.mjs";
  import "./index.css";
  import { Octokit, App } from "octokit/dist-web/index";
  console.log(Octokit);
  let results = "";

  flatc({
    noInitialRun: true,
  }).then((m) => {
    let e = { encoding: "utf8" };
    m.FS.writeFile(
      "/OMM.module.fbs",
      `enum referenceFrame : byte {
/// Earth Mean Equator and Equinox of J2000
EME2000,
///  Geocentric Celestial Reference Frame
GCRF,
/// Greenwich Rotating Coordinates
GRC,
/// International Celestial Reference Frame
ICRF,
/// International Terrestrial Reference Frame 2000
ITRF2000,
/// International Terrestrial Reference Frame 1993
ITRF93, 
/// International Terrestrial Reference Frame 1997
ITRF97,
/// Mars Centered Inertial
MCI,
/// True of Date, Rotating
TDR,
/// True Equator Mean Equinox
TEME,
/// True of Date
TOD, 
}

enum ephemerisType : byte {
 /// Simplified General Perturbation Model 
 SGP,
 /// Simplified General Perturbation Model  4
 SGP4,
 /// Simplified Deep Space Perturbation Model 4 
 SDP4,
 /// Simplified General Perturbation Model 8
 SGP8,
 /// Simplified Deep Space Perturbation Model 8
 SDP8,
 /// SGP4-XP
 SGP4XP
}

enum timeSystem : byte {
  /// Greenwich Mean Sidereal Time
  GMST,
  /// Global Positioning System
  GPS,
  /// Mission Elapsed Time
  MET,
  /// Mission Relative Time
  MRT,
  /// Spacecraft Clock (receiver) (requires rules for interpretation in ICD)
  SCLK,
  /// International Atomic Time
  TAI,
  /// Barycentric Coordinate Time
  TCB,
  /// Barycentric Dynamical Time
  TDB,
  /// Geocentric Coordinate Time
  TCG,
  /// Terrestrial Time
  TT,
  /// Universal Time
  UT1,
  /// Coordinated Universal Time 
  UTC
}

enum meanElementTheory : byte {
  /// Simplified General Perturbation Model  4
  SGP4,
  /// Draper Semi-analytical Satellite Theory
  DSST,
  /// Universal Semianalytical Method
  USM
}

enum manCovRefFrame : byte {
  // Another name for ‘Radial, Transverse, Normal’
  RSW,
  // Radial, Transverse, Normal
  RTN,
  // A local orbital coordinate frame (x velocity vec., w orbital angular momentum vec., N completes right handed system.)
  TNW
}

table OMM {
  // OMM Header
  CCSDS_OMM_VERS:double;
  CREATION_DATE:string;
  ORIGINATOR:string;

  // OMM Metadata
  OBJECT_NAME:string;
  OBJECT_ID:string;
  CENTER_NAME:string;
  REF_FRAME:referenceFrame = TEME;
  REF_FRAME_EPOCH:string;
  TIME_SYSTEM:timeSystem = UTC;
  MEAN_ELEMENT_THEORY:meanElementTheory = SGP4;

  // Mean Keplerian Elements in the Specified Reference Frame
  COMMENT:string;
  EPOCH:string;
  SEMI_MAJOR_AXIS:double;
  MEAN_MOTION:double;
  ECCENTRICITY:double;
  INCLINATION:double;
  RA_OF_ASC_NODE:double;
  ARG_OF_PERICENTER:double;
  MEAN_ANOMALY:double;
  GM:double;
  
  // Spacecraft Parameters
  MASS:double;
  SOLAR_RAD_AREA:double;
  SOLAR_RAD_COEFF:double;
  DRAG_AREA:double;
  DRAG_COEFF:double;

  // TLE Related Parameters (This section is only required if MEAN_ELEMENT_THEORY=SGP/SGP4)
  EPHEMERIS_TYPE:ephemerisType = SGP4;
  CLASSIFICATION_TYPE:string;
  NORAD_CAT_ID:uint32;
  ELEMENT_SET_NO:uint32;
  REV_AT_EPOCH:double;
  BSTAR:double;
  MEAN_MOTION_DOT:double;
  MEAN_MOTION_DDOT:double;
  
  // Position/Velocity Covariance Matrix (6x6 Lower Triangular Form. None or all parameters of the matrix must be given.
  // COV_REF_FRAME may be omitted if it is the same as the metadata REF_FRAME.) 
  COV_REF_FRAME:manCovRefFrame = RSW;
  CX_X:double;
  CY_X:double;
  CY_Y:double;
  CZ_X:double;
  CZ_Y:double;
  CZ_Z:double;
  CX_DOT_X:double;
  CX_DOT_Y:double;
  CX_DOT_Z:double;
  CX_DOT_X_DOT:double;
  CY_DOT_X:double;
  CY_DOT_Y:double;
  CY_DOT_Z:double;
  CY_DOT_X_DOT:double;
  CY_DOT_Y_DOT:double;
  CZ_DOT_X:double;
  CZ_DOT_Y:double;
  CZ_DOT_Z:double;
  CZ_DOT_X_DOT:double;
  CZ_DOT_Y_DOT:double;
  CZ_DOT_Z_DOT:double;

  // User Defined Parameters (all parameters in this section must be described in an ICD). 
  USER_DEFINED_BIP_0044_TYPE:uint;
  USER_DEFINED_OBJECT_DESIGNATOR:string;
  USER_DEFINED_EARTH_MODEL:string;
  USER_DEFINED_EPOCH_TIMESTAMP: double;
  USER_DEFINED_MICROSECONDS: double;
}

table mpe {
  MEAN_MOTION:double;
  ECCENTRICITY:double;
  INCLINATION:double;
  RA_OF_ASC_NODE:double;
  ARG_OF_PERICENTER:double;
  MEAN_ANOMALY:double;
  NORAD_CAT_ID:uint32;
  BSTAR:double;
  USER_DEFINED_EPOCH_TIMESTAMP: double;
}

table OMMcollection {
  RECORDS:[OMM];
}

table mpecollection {
  RECORDS:[mpe];
}

root_type OMM;
file_identifier "$OMM";`
    );
    m.main(["--help"]);
    m.main(["--jsonschema", "/OMM.module.fbs"]);
    console.log(m.FS.readdir("/"));
    results = m.FS.readFile("/OMM.module.schema.json", e);
  });
</script>

<main class="flex flex-col gap-2 items-center justify-center">
  <img src={logo} alt="Svelte Logo" />
  <h1>Hello Typescript!</h1>

  <Counter />

  <textarea class="border p-2 rounded h-32 w-1/2" bind:value={results} />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
