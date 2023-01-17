import React from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const addVote = (id, startCelebration, onComplete, onError) => {
  if (id) {
    var date = new Date();
    date.setTime(date.getTime() + 60 * 1000);
    var dropVotes = Cookies.get("dropVotes") ?? "[]";
    dropVotes = dropVotes ? JSON.parse(dropVotes) : [];
    if (isVoteNotIncluded(dropVotes, id)) {
      dropVotes.push({
        id,
        date: date,
      });
    } else {
      const newVotes = dropVotes;
      const voteIndex = newVotes.findIndex((item) => item.id === id);
      if (new Date(newVotes[voteIndex].date) < new Date()) {
        newVotes[voteIndex].date = date;
        dropVotes = newVotes;
      } else {
        toast.warn("You Have Already Voted!");
        onError(null);
        return false;
      }
    }
    axios
      .post("/drops/vote", {
        drop_id: id,
      })
      .then((res) => {
        startCelebration(5000);
        Cookies.set("dropVotes", JSON.stringify(dropVotes));
        toast.success("Vote Added Successful!");
        onComplete(res);
      })
      .catch((err) => {
        onError(err);
      });
  }
};

const isVoteNotIncluded = (votes, id) => {
  const vote = votes.filter((item) => item.id === id);
  if (vote.length > 0) {
    return false;
  } else {
    return true;
  }
};

const getUTCDate = (fullDate) => {
  let date = new Date(fullDate);

  // In case its IOS, parse the fulldate parts and re-create the date object.
  if (Number.isNaN(date.getMonth())) {
    try {
      let arr = fullDate.split(/[- :]/);
      date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
      return new Date(date.setHours(date.getHours() + 5))
        .toUTCString()
        .replace("GMT", "");
    } catch (err) {
      console.log(err);
      return new Date();
    }
  } else {
    return new Date(date.setHours(date.getHours() + 5))
      .toUTCString()
      .replace("GMT", "");
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addVote,
  getUTCDate,
};
