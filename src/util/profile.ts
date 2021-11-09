export type QuestionState = {
  key: number,
  question: string,
  options: {key: number, value:string}[],
  answer: number
}

export const getsurveyQuestions = async() => {
  const questions: QuestionState[] = [
    {
      key: 1,
      question: "¿Cómo calificas tu conocimiento en inversiones?",
      options: [
        { key: 1, value: "Principiante" },
        { key: 2, value: "Intermedio" },
        { key: 3, value: "Avanzado" },
        { key: 4, value: "Experto" },
      ],
      answer: 0,
    },
    {
      key: 2,
      question:
        "¿Qué porcentaje de su dinero destinará a inversiones?",
      options: [
        { key: 1, value: "Menos del 25%" },
        { key: 2, value: "Entre 26% y 50%" },
        { key: 3, value: "Entre 51% y 75%" },
        { key: 4, value: "Más del 75%" },
      ],
      answer: 0,
    },
    {
      key: 3,
      question: "¿Cuánto tiempo conservarías la inversión?",
      options: [
        { key: 1, value: "Menos de 6 meses" },
        { key: 2, value: "De 6 meses a 1 año" },
        { key: 3, value: "Entre 1 y 2 años" },
        { key: 4, value: "Mas de 2 años" }
      ],
      answer: 0,
    },
    {
      key: 4,
      question: "¿Cual es el objetivo por el cual tienes interés en invertir?",
      options: [
        { key: 1, value: "Preservar el dinero" },
        { key: 2, value: "Superar la rentabilidad que ofrece un plazo fijo" },
        { key: 3, value: "Alto rendimiento" },
        { key: 4, value: "Por que me gusta el riesgo" },
      ],
      answer: 0,
    },
    {
      key: 5,
      question:
        "¿Cómo te sientes frente al riesgo?",
      options: [
        { key: 1, value: "Lo evito a toda costa" },
        { key: 2, value: "No me gustan las inversines que impliquen pérdidas de capital" },
        { key: 3, value: "Aceptaria un minimo riesgo a cambio de mayor rentabilidad" },
        { key: 4, value: "No me importa, busco la mejor rentabilidad" },
      ],
      answer: 0,
    },
    {
      key: 6,
      question:
        "¿Qué harías si tu inversión comienza a perder valor?",
      options: [
        { key: 1, value: "Vendería la inversión para evitar una mayor perdida." },
        { key: 2, value: "Venderia una parte."},
        { key: 3, value: "Esperaría que la inversión recupere su valor inicial." },
        { key: 4, value: "Compraría una mayor cantidad aprovechando que el precio actual es menor que el pagado inicialmente." },
      ],
      answer: 0,
    }
  ];
  return questions;
};
