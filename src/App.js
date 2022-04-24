import React, {useState} from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, TextField, MenuItem, Button, Typography, Select, InputLabel, FormControl, FormHelperText } from "@mui/material";
import moment from "moment";
import {
  isBornBefore2000,
  randomPPPNum,
  genderNumberGenerator,
  multiplyByTemplate,
  modifyArray,
  sumOfArray,
  generateControlNumber
} from "./helper-functions/helperFunctions";



function App() {

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState("");
  const [random, setRandom] = useState([]);
  const [errorMessages, setErrorMessages] = useState("");const [pesel, setPesel] = useState("");

  function generatePESEL() {
    let enteredValues;
    // RRMMDD - first 6 numbers of PESEL(in Array)
    let RRMMDD;
    // PPP - 7,8,9th number of PESEL(in Array)
    let PPP;
    // P - woman/man number (in Array)
    let P;
    // 10 digit numbers of PESEL (in Array)
    let RRMMDDPPPP;
    // control number (last digit in PESEL)
    let K;
    // full PESEL number generated (in Array)
    let RRMMDDPPPPK;
    enteredValues = Number(
      moment(dateOfBirth).format("YYYY-MM-DD").split("-").join("")
    );
    RRMMDD = isBornBefore2000(RRMMDD, enteredValues);
    PPP = randomPPPNum(random);
    P = genderNumberGenerator(gender);
    RRMMDDPPPP = RRMMDD.concat(PPP).concat(P);
    const multipliedArray = multiplyByTemplate(RRMMDDPPPP);
    const correctedArray = modifyArray(multipliedArray);
    const sum = sumOfArray(correctedArray);
    K = generateControlNumber(sum);
    RRMMDDPPPPK = [...RRMMDDPPPP, K].join("");
    setPesel(RRMMDDPPPPK);
  }



  const sendForm = (e) => {
    e.preventDefault();
    const yearEntered = moment(dateOfBirth).format("YYYY");
    if (dateOfBirth === null || gender === "") {
      setErrorMessages("all fields are requried");
      setPesel("")
      return;
    } else if (
      yearEntered === "Invalid date" ||
      yearEntered < 1900 ||
      yearEntered > 2099
    ) {
      setErrorMessages("Invalid date or Gender is not filled correctly");
      setPesel("");
      return;
    }

    generatePESEL();
    setDateOfBirth(null);
    setGender("");
    setRandom([]);
    setErrorMessages('')
  };


  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        marginTop={10}
        padding={5}
      >
        <Typography variant="h3">PESEL-GENERATOR</Typography>
        <Box margin="30px auto 0 auto">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date Of Birth"
              value={dateOfBirth}
              views={["year", "month", "day"]}
              onChange={(newValue) => {
                setDateOfBirth(newValue);
              }}

              inputFormat="dd/MM/yyyy"
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={errorMessages.length>0}
                  helperText={
                    errorMessages === ""
                      ? params?.inputProps?.placeholder
                      : errorMessages
                  }
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box width="250px" textAlign="center" margin="30px auto">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={gender}
              label="Gender"
              onChange={(e) =>{
                setGender(e.target.value);
              } }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"W"}>Woman</MenuItem>
              <MenuItem value={"M"}>Man</MenuItem>
            </Select>
            <FormHelperText
              sx={
                errorMessages === ""
                  ? {
                      color: "grey",
                    }
                  : {
                      color: "#d32f2f",
                    }
              }
            >
              {errorMessages === "" ? "Please select gender" : errorMessages}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box marginTop={3}>
          <Button type="submit" variant="contained" onClick={sendForm}>
            GENERATE
          </Button>
        </Box>
        <Typography variant="body1" gutterBottom marginTop={10}>
          Generated PESEL is:
        </Typography>
        {pesel ? (
          <Typography
            variant="h4"
            marginTop={1}
            backgroundColor="lightgrey"
            padding={1.5}
            borderRadius="5px"
          >
            {pesel}
          </Typography>
        ) : null}
      </Box>
    </>
  );
}

export default App;
