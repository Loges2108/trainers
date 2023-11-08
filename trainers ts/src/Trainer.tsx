import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Tooltip,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import { ITrainers } from "./interface";
import { Visibility } from "@mui/icons-material";
import TrainerDrawer from "./TrainerDrawer";

const initialValues: ITrainers = {
  _id: "",
  name: "",
  phoneNumber: "",
  gender: "",
  age: "",
  email: "",
  avatar: "",
};

function Trainers() {
  const [trainer, setTrainer] = useState<ITrainers[]>();
  const [selectedTrainer, setSelectedTrainer] =
    useState<ITrainers>(initialValues);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isviewed, setIsviewed] = useState(false);

  const getAllTrainers = async () => {
    try {
      const response = await axios.get<ITrainers[]>(
        "http://localhost:3100/gettrainers"
      );

      setTrainer(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    getAllTrainers();
  }, []);

  const openDrawer = (trainer: ITrainers) => {
    setSelectedTrainer(trainer);
    setIsDrawerOpen(true);
    setIsviewed(false)
  };

  const handleAddTrainerClick = () => {
    setSelectedTrainer(initialValues);
    setIsDrawerOpen(true);
    setIsviewed(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setIsviewed(false);
  };

  return (
    <>
    <Container>
      <Grid container 
  direction="row"
  justifyContent="space-between"
  alignItems="flex-start"
  paddingBottom={3}
>
        <Grid  >
          <Typography variant="h5">Trainer Details</Typography>
        </Grid>
        
        <Grid  >
        <Button
            variant="contained"
            color="secondary"
            onClick={handleAddTrainerClick}
          >
            Add Trainer
          </Button>
        </Grid>
      </Grid>
      </Container>

      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Profile</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">PhoneNumber</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainer &&
                trainer.length &&
                trainer?.map((vtrainer, index) => (
                  <TableRow key={index}>
                    <TableCell align="center" component={"th"}>
                      <img width={50} height={50}
                        src={`http://localhost:3100/getavatars/${vtrainer.avatar}`}
                      />
                    </TableCell>
                    <TableCell align="center">{vtrainer.name}</TableCell>
                    <TableCell align="center">{vtrainer.age}</TableCell>
                    <TableCell align="center">{vtrainer.email}</TableCell>
                    <TableCell align="center">{vtrainer.phoneNumber}</TableCell>
                    <TableCell align="center">{vtrainer.gender}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton onClick={() => openDrawer(vtrainer)}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {isDrawerOpen && (
        <TrainerDrawer
                  open={isDrawerOpen}
                  onClose={closeDrawer}
                  TrainerData={selectedTrainer}
                  onSuccess={() => {
                      getAllTrainers();
                      setIsDrawerOpen(false);
                      setIsviewed(false);
                  } } isEditable={isviewed}          
        
        />
      )}
    </>
  );
}
export default Trainers;
