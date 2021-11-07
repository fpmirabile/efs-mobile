import * as React from "react";
import { FlatList } from "react-native";
import { BasicStackComponentProps } from "../../../types";
import { Grupo } from "../../api/models/reels";
import ProfileView from "./view";
import { QuestionState } from "../../util/profile";

export interface Props extends BasicStackComponentProps {
    onGetSurveyQuestions:() => Promise<QuestionState[]>
//   onGetGroups: () => Promise<Grupo[]>;
//   onGetPopularReels: (groupId: number) => Promise<ReelPopular[]>;
//   onFavoriteReel: (reelId: number) => Promise<void>;
//   onLikeReel: (reelId: number, liked: boolean) => Promise<void>;
}

interface State {
  isLoading: boolean;
  questions: QuestionState[]
  currentIndex: number;
  status:number;
  surveyOver:boolean;
//   filterGroups: Grupo[];
//   popularReels: ReelPopular[];
//   reels: Seccion[];
}

class ProfileController extends React.PureComponent<Props, State> {
  filterRef: React.RefObject<FlatList<Grupo>> = React.createRef();
  state: State = {
    isLoading: true,
    questions:[],
    currentIndex: 0,
    status:0,
    surveyOver: false
    // filterGroups: [],
    // reels: [],
    // popularReels: [],
  };

  async componentDidMount() {
    //const { onGetGroups, onGetPopularReels, onGetReelsByGroup } = this.props;
    const { onGetSurveyQuestions } = this.props;
    const { currentIndex } = this.state;
    

    try {
    //   const allFilters = await onGetGroups();
    //   if (allFilters && allFilters.length) {
    //     const currentFilter = allFilters[currentIndex];
    //     if (!currentFilter) {
    //       return;
    //     }

        // const popularReels = await onGetPopularReels(currentFilter.grupoId);
        // const reels = await onGetReelsByGroup(currentFilter.grupoId);
        const questions = await onGetSurveyQuestions();
         this.setState({
        //   reels,
        //   popularReels,
        //   filterGroups: allFilters,
          isLoading: false,
          questions
        });
      }
     catch (exception: any) {
      // TODO: Set an error message or page.
      console.log(exception);
    }
  }

  handleSelectAnser = async (status: number) => {
    this.setState({
      status: status
    });}

//     const { filterGroups } = this.state;
//     const { onGetReelsByGroup } = this.props;
//     const groupReels = await onGetReelsByGroup(filterGroups[index].grupoId);

//     this.setState({
//       currentIndex: index,
//       reels: groupReels,
//       isLoading: false,
//     });
//   };
// const checkAnswer = ()=>{ 
//   if (!surveyOver){
//     const answer = setAnswer.current;
//     console.log(answer)
//     setScore((prev) => prev + 1);
//     //save answer in the array of answers
//     const answerObject = {
//       question: questions[number].question,
//       answer: "",
//     };
//     setUserAnswers(prev => [...prev, answerObject]);
//   }
// };
 handlePrevQuestion =()=> {
   const { questions, currentIndex } = this.state
  //move on to the next question if not the last question
  const nextQ = currentIndex - 1;
  if(nextQ === questions.length){
    this.setState({
      surveyOver: true,
      status:0
    })
  } else{
    this.setState({
      currentIndex:nextQ,
      status:0,
    });
  }
};
 handleNextQuestion = () => {
  //move on to the next question if not the last question
  const { questions,  currentIndex  } = this.state
  const nextQ =  currentIndex + 1;
  if(nextQ === questions.length){
    this.setState({
      surveyOver:true,
      status:0,
    });
  } else{
    this.setState({
      currentIndex:nextQ,
      status:0,
    })
  }
}; 

//  startQuizProfile = async ()=>{
//   setLoading(true)
//   setSurveyOver(false)
//   const survey =  await getsurveyQuestions();
//   setQuestions(survey);
//   setScore(0);
//   setUserAnswers([]);
//   setNumber(0);
//   setLoading(false);
// }

//   handleFilterScrollEnd = (data: any, index: number) => {
//     if (isNaN(index)) {
//       return;
//     }

//     this.handleFilterChanged(index);
//   };

//   handleItemPress = (index: number) => () => {
//     this.filterRef.current?.scrollToIndex({ index, animated: true });
//     this.handleFilterChanged(index);
//   };

//   handlePressVideo = () => {
//     const { navigation } = this.props;
//     navigation.navigate("Video");
//   }

  render() {
    // const { currentIndex, filterGroups, reels, popularReels, isLoading } =
    const { currentIndex, questions, isLoading, status, surveyOver } =
      this.state;
    return (
    //   <ReelsView
    //     filterRef={this.filterRef}
    //     currentIndex={currentIndex}
    //     onFilterScrollEnd={this.handleFilterScrollEnd}
    //     onPressedItem={this.handleItemPress}
    //     onPressVideo={this.handlePressVideo}
    //     onImageLoadError={() => {
    //       return "";
    //     }}
    //     filters={filterGroups}
    //     seccionReels={reels}
    //     popularReels={popularReels}
    //     isLoading={isLoading}
    //   />
        <ProfileView
         isLoading={isLoading}
         currentIndex={currentIndex}   
         questions={questions}
         onSelectAnswer={this.handleSelectAnser}
         status={status}
         surveyOver={surveyOver}
         onPressPrevQuestion={this.handlePrevQuestion}
         onPressNextQuestion={this.handleNextQuestion}
        />
    );
  }
}

export default ProfileController;
