[
  [0.8, 0.4, 0],
  [0.2, 0.9, 0.25],
  [0, 0.5, 1],
];

[180, 102, -384];

[
  {
    lr: { fem: 0, steps: ["`M_(F1.2) = 0 Nm`"], name: "1.2" },

    rl: {
      fem: -54,

      steps: [
        "`M_(F2.1) = -(w*l^2)/2 Nm`",
        "`M_(F2.1) = -(12.00*3.00^2)/2 Nm`",
        "`M_(F2.1) = -54.00 Nm`",
      ],

      name: "2.1",
    },

    section: [
      {
        id: "fa61adcd-8114-4de0-a168-00d3afe121b0",

        type: "uniform",

        distanceFromLeft: "0",

        valueOfLoading: "12",

        spanOfLoading: "3",

        openingValue: "",

        closingValue: "",
      },

      {
        id: "35f82571-1ff1-4d92-a792-9d8da5cfe948",

        type: "pinned",

        sinking: false,

        sinkingValue: "",

        distanceFromLeft: "3",
      },
    ],
  },

  {
    lr: {
      fem: -36,

      steps: [
        "`M_(F2.3) = -(w * l)/8.00`",
        "`M_(F2.3) = -((48.00)(6.00))/8.00`",
        "`M_(F2.3) = -36.00 Nm`",
      ],

      name: "2.3",
    },

    rl: {
      fem: 36,

      steps: [
        "`M_(F3.2) = (w * l)/8.00`",
        "`M_(F3.2) = ((48.00)(6.00))/8`",
        "`M_(F3.2) = 36.00 Nm`",
      ],

      name: "3.2",
    },

    section: [
      {
        id: "35f82571-1ff1-4d92-a792-9d8da5cfe948",

        type: "pinned",

        sinking: false,

        sinkingValue: "",

        distanceFromLeft: "3",
      },

      {
        id: "49ddf168-71e5-4931-b537-9548c6f9fc2c",

        type: "single",

        distanceFromLeft: "6",

        valueOfLoading: "48",

        spanOfLoading: "",

        openingValue: "",

        closingValue: "",
      },

      {
        id: "85ca964e-e14d-4c86-a2e5-1072b434e60b",

        type: "pinned",

        sinking: false,

        sinkingValue: "",

        distanceFromLeft: "9",
      },

      {
        id: "b60c39ca-b245-4433-8c61-5926c1d513a5",

        type: "varying",

        distanceFromLeft: "9",

        valueOfLoading: "",

        spanOfLoading: "4",

        openingValue: "0",

        closingValue: "90",
      },
    ],
  },

  {
    lr: {
      fem: -48,

      steps: [
        "`M_(F3.4) = -(w * l^2.00) / 30.00`",
        "`M_(F3.4) = -((90.00)(4.00^2.00)) / (30.00)`",
        "`M_(F3.4) = -48.00 Nm`",
      ],

      name: "3.4",
    },

    rl: {
      fem: 72,

      steps: [
        "`M_(F4.3) = +(w * l^2.00) / 20.00`",
        "`M_(F4.3) = +((90.00)(4.00^2.00)) / (20.00)`",
        "`M_(F4.3) = 72.00 Nm`",
      ],

      name: "4.3",
    },

    section: [
      {
        id: "85ca964e-e14d-4c86-a2e5-1072b434e60b",

        type: "pinned",

        sinking: false,

        sinkingValue: "",

        distanceFromLeft: "9",
      },

      {
        id: "b60c39ca-b245-4433-8c61-5926c1d513a5",

        type: "varying",

        distanceFromLeft: "9",

        valueOfLoading: "",

        spanOfLoading: "4",

        openingValue: "0",

        closingValue: "90",
      },

      {
        id: "638ce73c-4877-4300-b063-2fe1c5e0698c",

        type: "fixed",

        sinking: false,

        sinkingValue: "",

        distanceFromLeft: "13",
      },
    ],
  },
];