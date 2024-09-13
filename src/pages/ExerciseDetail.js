import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import {exerciseOptions,fetchData, youtubeOptions} from '../utils/fetchData'
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const ExerciseDetail = () => {

  const [exerciseDetail,setExerciseDetail]=useState({});
  const [exerciseVideos,setExerciseVideos]=useState([]);
  const [targetMuscleExercises,setTargetMuscleExercises]=useState([]);
  const [equipmentExercises,setEquipmentExercises]=useState([]);
  const {id}=useParams();

  useEffect(()=>{
    const fetchExercisesData=async ()=>{
      const exerciseDbUrl='https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl='https://youtube-search-and-download.p.rapidapi.com';
      //fetch exercise data
      const exerciseDetailData=await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`,exerciseOptions);
      //setting exercise details to exercise detail data
      setExerciseDetail(exerciseDetailData);

      //fetching youtube related data
      const exerciseVideosData=await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetail.name}`,youtubeOptions);
      setExerciseVideos(exerciseVideosData.contents);
      //Target muscle data for similar exercises API call
      const targetMuscleExercisesData=await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);

      //Equipment data for similar exercises API call
      const equipmentExercisesData=await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,exerciseOptions);
      setEquipmentExercises(equipmentExercisesData);

    };
    fetchExercisesData();
  },[id])
  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail}/>
      {/* <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/> */}
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  )
}

export default ExerciseDetail;
