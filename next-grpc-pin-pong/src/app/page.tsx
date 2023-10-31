"use client";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { PingRequest } from "../services/pingpong_pb";
import { PingPongServiceClient } from "../services/pingpong_pb_service";
import styles from "./page.module.css";

export default function Home() {
  const [pongs, setPongs] = useState<string[]>([]);
  const client = new PingPongServiceClient("http://localhost:8080");
  const callGrpcService = () => {
    const request = new PingRequest();
    request.setPing("Ping");

    client.pingPong(request, {}, (err, response) => {
      if (response == null) {
        console.log(err);
      } else {
        console.log("response", response);
        setPongs([...pongs, response?.getPong()]);
      }
    });
  };
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Typography variant="h2">NextJS + gRPC</Typography>

        <Typography marginTop="20px" marginBottom="40px" variant="h3">
          Ping Pong
        </Typography>

        <Button variant="contained" onClick={callGrpcService}>
          Send Ping
        </Button>

        <List style={{ marginTop: "20px" }}>
          {pongs?.map((pong, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={pong} />
            </ListItem>
          ))}
        </List>
      </div>
    </main>
  );
}
