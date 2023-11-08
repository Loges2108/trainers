import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Typography,
  Divider,
  Tooltip,
  Button,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Cancel as CancelIcon } from "@mui/icons-material";
import { ITrainers } from "./interface";
import axios from "axios";

type TrainerDrawerProps = {
  open: boolean;
  onClose: () => void;
  TrainerData: ITrainers;
  onSuccess: () => void;
  isEditable: boolean;
};

const TrainerDrawer: React.FC<TrainerDrawerProps> = ({
  open,
  onClose,
  TrainerData,
  onSuccess,
  isEditable,
}: TrainerDrawerProps) => {
  const [viewedTrainer, setViewedTrainer] = useState<ITrainers>({
    ...TrainerData,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setViewedTrainer((prevDetails: ITrainers) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setSelectedImage(selectedFile);
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          setImagePreview(event.target.result as string);
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };


  const onSave = async () => {
    if (selectedImage) {
      const formdata = new FormData();
      formdata.append("avatar", selectedImage);
      formdata.append("name", viewedTrainer.name.toString());
      formdata.append("age", viewedTrainer.age.toString());
      formdata.append("email", viewedTrainer.email.toString());
      formdata.append("phoneNumber", viewedTrainer.phoneNumber.toString());
      formdata.append("gender", viewedTrainer.gender.toString());

      try {
        await axios.post<ITrainers[]>(
          "http://localhost:3100/createtrainers",
          formdata
        );
        onSuccess();

        onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ position: "relative" }}
      PaperProps={{
        sx: {
          width: "350px",
          height: "100%",
          overflowX: "hidden"
        },
      }}
    >
      {TrainerData && (
        <Box padding={3} alignItems={"center"} justifyItems={"center"}>
          <Box>
            <Tooltip title="Cancel">
              <IconButton onClick={onClose} style={{ float: "right" }}>
                <CancelIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h4">
              {isEditable ? "Add Trainer" : "Trainer Details"}
            </Typography>

            <Divider />
            <Box paddingY={3}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
               <Box display={"flex"} alignContent ={"center"} justifyContent={"center"}> <Typography variant="body1">Profile</Typography> </Box>
                <Box
                  paddingTop={1}  display={"flex"} alignContent ={"center"} justifyContent={"center"}
                >
                  {isEditable ? (
                  <Box paddingBottom={2}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageInputChange}
                    />
                    {imagePreview && (
                      <Box paddingTop={1}  display={"flex"} alignContent ={"center"} justifyContent={"center"}>
                      <img
                        src={imagePreview}
                        alt="Selected Image"
                        width={100}
                        height={100}
                      />
                      </Box>
                    )}
                  </Box>
                ) : ( <Box >
                  <img
                    width={100}
                    height={100}
                    src={`http://localhost:3100/getavatars/${viewedTrainer.avatar}`}
                    alt="Trainer avatar"
                  />
                  </Box>
                )}
              </Box>
              <Box mb={2}>

                <Box paddingY={1}>
                  <TextField
                  fullWidth
                  size="medium"
                  sx={{ gap: 2}}
                  label="Name"
                  name="name"
                  value={viewedTrainer.name}
                  onChange={handleTextFieldChange}
                  InputLabelProps={{
                    sx: { textAlign: "center" }, 
                  }}
                  InputProps={{
                    sx: { textAlign: "center" },
                  }}
                />
                </Box>
                <Box paddingY={1}>
                <TextField
                  fullWidth
                  size="medium"
                  sx={{ gap: 2}}
                  label="Age"
                  name="age"
                  value={viewedTrainer.age}
                  onChange={handleTextFieldChange}
                  InputLabelProps={{
                    sx: { textAlign: "center" }, 
                  }}
                  InputProps={{
                    sx: { textAlign: "center" },
                  }}
                />
                </Box>
                <Box paddingY={1}>
                <TextField
                  fullWidth
                  size="medium"
                  sx={{ gap: 2 }}
                  label="Email"
                  name="email"
                  value={viewedTrainer.email}
                  onChange={handleTextFieldChange}
                  InputLabelProps={{
                    sx: { textAlign: "center" }, 
                  }}
                  InputProps={{
                    sx: { textAlign: "center" },
                  }}
                />
                </Box>
                <Box paddingY={1}>
                <TextField
                  fullWidth
                  size="medium"
                  sx={{ gap: 2}}
                  label="phone Number"
                  name="phoneNumber"
                  value={viewedTrainer.phoneNumber}
                  onChange={handleTextFieldChange}
                  InputLabelProps={{
                    sx: { textAlign: "center" },
                  }}
                  InputProps={{
                    sx: { textAlign: "center" },
                  }}
                />
                </Box>
                 </Box>
                 <Box paddingX={2}>
                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Gender
                  </FormLabel>
                  <Box paddingLeft={3}>
                  <RadioGroup 
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="gender"
                    value={viewedTrainer.gender}
                    onChange={handleTextFieldChange}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                     <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                    
                  </RadioGroup>
                  </Box>
                </FormControl>
                </Box> 
                {isEditable && (
                  <Box display={"flex"}
                  justifyContent={"flex-end"}
                  gap={1}
                  marginTop={2}>
                    <Button 
                      variant="contained"
                      color="primary"
                      onClick={onSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </form>
            </Box>
          </Box>
        </Box>
      )}
    </Drawer>
  );
};

export default TrainerDrawer;
