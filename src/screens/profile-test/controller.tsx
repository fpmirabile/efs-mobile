import * as React from "react";
import { FlatList } from "react-native";
import { BasicStackComponentProps } from "../../../types";
import { Grupo } from "../../api/models/reels";
import ProfileView from "./view";
import { QuestionState } from "../../util/profile";


export interface Props extends BasicStackComponentProps {
    onGetSurveyQuestions:() => Promise<QuestionState[]>
    onPostScore: (score:number) => Promise<void>;
}
export type AnswerObject = {
  question: number;
  answer: number;
}

interface State {
  isLoading: boolean;
  questions: QuestionState[]
  currentIndex: number;
  status:number;
  surveyOver:boolean;
  score:0;
}

class ProfileController extends React.PureComponent<Props, State> {
  filterRef: React.RefObject<FlatList<Grupo>> = React.createRef();
  state: State = {
    isLoading: true,
    questions:[],
    currentIndex: 0,
    status:0,
    surveyOver: false,
    score: 0
  };

  async componentDidMount() {
    const { onGetSurveyQuestions } = this.props;
    const { currentIndex } = this.state;
    try {
        const questions = await onGetSurveyQuestions();
        if(questions.length===0){
          return
        }
         this.setState({
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
    const { surveyOver, currentIndex,questions  } = this.state
    this.setState({
      status: status
    });

   if (!surveyOver){
     questions[currentIndex].answer=status;
     console.log(questions[currentIndex].answer)
   }
 };

 handlePrevQuestion =()=> {
   const { questions, currentIndex } = this.state
  //move on to the next question if not the last question
  const nextQ = currentIndex - 1;
    this.setState({
      currentIndex:nextQ,
      status:0,
  })
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

handleEnd = () => {
  const { navigation} = this.props;
  const { questions } = this.state;
  let score: number = 0;

  questions.forEach((question)=>{
    score = score + question.answer;
  })
    //TODO: onPostScore(score);
  navigation.navigate("Home");
}

//   handlePressVideo = () => {
//     const { navigation } = this.props;
//     navigation.navigate("Video");
//   }

  render() {
    const { currentIndex, questions, isLoading, status, surveyOver } =
      this.state;
    return (
        <ProfileView
         isLoading={isLoading}
         currentIndex={currentIndex}   
         questions={questions}
         onSelectAnswer={this.handleSelectAnser}
         status={status}
         surveyOver={surveyOver}
         onPressPrevQuestion={this.handlePrevQuestion}
         onPressNextQuestion={this.handleNextQuestion}
         onPressEnd={this.handleEnd}
        />
    );
  }
}

export default ProfileController;
