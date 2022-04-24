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
    //console.log(RRMMDD);
    PPP = randomPPPNum(random);
    //console.log(PPP)
    P = genderNumberGenerator(gender);
    //console.log(P)
    RRMMDDPPPP = RRMMDD.concat(PPP).concat(P);
    //console.log(RRMMDDPPPP)
    const multipliedArray = multiplyByTemplate(RRMMDDPPPP);
    //console.log(multipliedArray)
    const correctedArray = modifyArray(multipliedArray);
    //console.log(correctedArray)
    const sum = sumOfArray(correctedArray);
    //console.log(sum)
    K = generateControlNumber(sum);
    //console.log(K)
    RRMMDDPPPPK = [...RRMMDDPPPP, K].join("");
    console.log("result:", RRMMDDPPPPK);
  }



  const sendForm = (e) => {
    e.preventDefault();
    if (dateOfBirth === null || gender === "") {
      console.log("all fields are requried");
      return;
    }

    
    generatePESEL();
    setDateOfBirth(null);
    setGender("");
    setRandom([]);
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
              onChange={(newValue) => setDateOfBirth(newValue)}
              inputFormat="dd/MM/yyyy"
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={params?.inputProps?.placeholder}
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
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"W"}>Woman</MenuItem>
              <MenuItem value={"M"}>Man</MenuItem>
            </Select>
            <FormHelperText>Please select gender</FormHelperText>
          </FormControl>
        </Box>
        <Box marginTop={3}>
          <Button type="submit" variant="contained" onClick={sendForm}>
            GENERATE
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default App;
