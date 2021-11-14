import * as React from "react";
import { FlatList } from "react-native";
import { BasicStackComponentProps } from "../../../types";
import { Grupo } from "../../api/models/reels";
import RenderQuiz from "./view";
import { QuestionState } from "../../util/profile";

export interface Props extends BasicStackComponentProps {
  onGetSurveyQuestions: () => Promise<QuestionState[]>;
  onPostScore: (score: number) => Promise<void>;
}
export type AnswerObject = {
  question: number;
  answer: number;
};

interface State {
  isLoading: boolean;
  isContinue: boolean;
  questions: QuestionState[];
  currentIndex: number;
  status: number;
  surveyOver: boolean;
  score: number;
  profile: string;
}

class ProfileController extends React.PureComponent<Props, State> {
  filterRef: React.RefObject<FlatList<Grupo>> = React.createRef();
  state: State = {
    isLoading: true,
    isContinue: false,
    questions: [],
    currentIndex: 0,
    status: 0,
    surveyOver: false,
    score: 0,
    profile: "Principiante",
  };

  async componentDidMount() {
    const { onGetSurveyQuestions } = this.props;
    try {
      const questions = await onGetSurveyQuestions();
      if (questions.length === 0) {
        return;
      }
      this.setState({
        isLoading: false,
        questions,
      });
    } catch (exception: any) {
      const { navigation } = this.props;
      console.log(exception);
      navigation.navigate("NotFound");
    }
  }

  handleSelectAnser = async (status: number) => {
    const { surveyOver, currentIndex, questions } = this.state;
    this.setState({
      status: status,
    });
    if (!surveyOver) {
      questions[currentIndex].answer = status;
      if(currentIndex===0 && questions[currentIndex].answer == 1){
        console.log(status)
        const resp = await this.handleEnd();
      }
    }

  };

  handlePrevQuestion = () => {
    const { questions, currentIndex, isContinue } = this.state;
    //move on to the next question if not the last question
    if (currentIndex <= 0) {
      this.setState({
        currentIndex:0,
        status: 0,
        isContinue: false,
        surveyOver: false,
        score:0
      });
    } else {
      const nextQ = currentIndex - 1;
      this.setState({
        currentIndex: nextQ,
        status: 0,
      });
    }
  };
  handleNextQuestion = () => {
    //move on to the next question if not the last question
    const { questions, currentIndex, surveyOver } = this.state;
    const nextQ = currentIndex + 1;
    if (nextQ == questions.length-1) {
      this.setState({
        surveyOver: true,
        status: 0,
        currentIndex: nextQ,
      });
    } else {
      this.setState({
        currentIndex: nextQ,
        status: 0,
      });
    }
  };

  handleEnd = async () => {
    const { onPostScore } = this.props;
    const { questions, surveyOver } = this.state;
    let score: number = 0;
    let prof: string = 'Principiante';

    questions.forEach((question) => {
      score = score + question.answer;
    });
    if ( score === 0 ) { score = 1 ;}
    const resp = await onPostScore(score);
    // console.log(resp);
    //TODO Set variable profile with the resp
    prof = calculateProfile(score)
    this.setState({
           score:score,
           surveyOver:true,
           profile: prof
         }); 
  };
  handleContinuePress = () => {
    this.setState({
      isContinue: true,
    });
  };
  handleSkipProfilePress = () => {
    const { navigation } = this.props;
    navigation.navigate("Home");
  };
  handleContinueEndPress = () => {
    const { navigation } = this.props;
    navigation.navigate("Home");
  };

  render() {
    const {
      currentIndex,
      questions,
      isLoading,
      status,
      score,
      profile,
      surveyOver,
      isContinue,
    } = this.state;
    return (
      <RenderQuiz
        isLoading={isLoading}
        isContinue={isContinue}
        currentIndex={currentIndex}
        questions={questions}
        score={score}
        profile={profile}
        onSelectAnswer={this.handleSelectAnser}
        status={status}
        surveyOver={surveyOver}
        onPressPrevQuestion={this.handlePrevQuestion}
        onPressNextQuestion={this.handleNextQuestion}
        onPressEnd={this.handleEnd}
        onSkipProfilePress={this.handleSkipProfilePress}
        onContinuePress={this.handleContinuePress}
        onContinueEndPress={this.handleContinueEndPress}
      />
    );
  }
}

const calculateProfile = (score:number)=>{
  if( score > 7 && score <= 15 ){
    return "Conservador";
  } else{
    if( score > 15 && score <= 24 ){
      return "Moderado";
    } else{
      if(score > 24 && score <= 33){
        return "Agresivo"
      } else{
        return "Principiante"
      }
    }
  }
  
  
}

export default ProfileController;
