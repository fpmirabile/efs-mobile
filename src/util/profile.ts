export const getsurveyQuestions = () => {
  return [
    {
      key: 1,
      question: "¿Que edad tienes?",
      options: [
        { key: 4, value: "Menor de 35 años" },
        { key: 3, value: "Entre 36 y 50 años" },

        { key: 2, value: "50 años o más" },

        { key: 1, value: "Prefiero no responder" },
      ],
      answer: "",
    },
    {
      key: 2,
      question:
        "¿Qué porcentaje de su patrimonio total destinará a inversiones?",
      options: [
        { key: 1, value: "Menos del 25%" },
        { key: 2, value: "Entre 26% y 50%" },

        { key: 3, value: "Entre 51% y 75%" },

        { key: 4, value: "Más del 75%" },
      ],
      answer: "",
    },
    {
      key: 3,
      question: "¿Qué experiencia previa tiene en inversiones?",
      options: [
        { key: 1, value: "No tengo experiencia en inversiones" },
        { key: 2, value: "Invierto/he invertido en plazo fijos" },

        {
          key: 3,
          value:
            "Invierto/he invertido en bonos, letras u obligaciones negociables",
        },

        {
          key: 4,
          value: "Invierto/he invertido en acciones o fondos de renta variable",
        },

        {
          key: 5,
          value:
            " Invierto/he invertido en instrumentos financieros sofisticados (opciones y derivados)",
        },
      ],
      answer: "",
    },
    {
      key: 4,
      question: "¿Qué nivel de capacitación tiene en el campo de las finanzas?",
      options: [
        { key: 1, value: "No tengo educación formal sobre el tema" },
        { key: 2, value: "Hice algún curso o materia afín al tema" },

        {
          key: 3,
          value: "Curse una carrera o postgrado relacionada con la materia",
        },

        { key: 4, value: "Estudió y trabajo en finanzas" },
      ],
      answer: "",
    },
    {
      key: 5,
      question:
        "Horizonte de inversión / ¿En cuánto tiempo necesita contar con sus ahorros?",
      options: [
        { key: 1, value: "Menos de 6 meses" },
        { key: 2, value: "Entre 6 meses y un año" },

        { key: 3, value: "Entre uno y dos años" },

        { key: 4, value: "Más de dos años" },
      ],
      answer: "",
    },
    {
      key: 6,
      question:
        "¿Cuál de las siguientes frases mejor describe su objetivo al invertir?",
      options: [
        {
          key: 1,
          value:
            "Preservar el capital invertido, minimizando el riesgo de pérdida de valor",
        },
        {
          key: 2,
          value:
            "Preservar el capital, pero estoy dispuesto a afrontar pérdidas en el corto plazo para obtener un rendimiento levemente superior a un plazo fijo.",
        },

        {
          key: 3,
          value:
            "Busco crecimiento y rendimiento del capital, puedo afrontar fluctuaciones negativas en mi inversión inicial por períodos de 1-2 años, para obtener un ingreso muy superior al ofrecido por instrumentos a plazo.",
        },

        {
          key: 4,
          value:
            "Quiero un crecimiento y rendimiento de mi inversión lo más alto posible, aceptando grandes fluctuaciones por períodos de 2 años o más, incluyendo posibles pérdidas de mi capital inicial",
        },
      ],
      answer: "",
    },
    {
      key: 7,
      question:
        "Partiendo de la premisa que las inversiones con mayor rentabilidad esperada son aquellas con mayor riesgo,¿Cuál es la máxima pérdida que usted estaría dispuesto a aceptar en un plazo de 6 meses?",
      options: [
        {
          key: 1,
          value:
            "No acepto pérdidas en mi capital inicial, sin importar el potencial de rentabilidad",
        },
        { key: 2, value: "Pérdidas de hasta 3%" },

        { key: 3, value: "Pérdidas de hasta 15%" },

        { key: 4, value: "Pérdidas de más del 15%" },
      ],
      answer: "",
    },
    {
      key: 8,
      question: "¿Conservaría una inversión que se devalúa?",
      options: [
        {
          key: 1,
          value: "No, cambiaría inmediatamente a instrumentos estables",
        },
        { key: 2, value: "No, cambiaría lentamente a otras inversiones" },

        { key: 3, value: "Si, considerando un análisis de la situación" },

        {
          key: 4,
          value:
            "Si, toleraría una pérdida esperando un rendimiento superior, e incluso subiría mi tenencia en la inversión",
        },
      ],
      answer: "",
    },
  ];
};
