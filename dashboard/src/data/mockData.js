// Mock data closely mirroring real Excel structure
// Months: Nov 2022 – Mar 2026, showing last 12 months for display

export const PRODUCTS = ['FIF', 'Bridge']
export const SEGMENTS = ['Individuals', 'Groups']
export const TELCOS = ['All', 'Airtel', 'Telkom']

// Monthly summary data (FIF Individuals) — ID_MNTH YYYYMM
export const monthlyData = [
    { month: '202303', label: 'Mar 2023', custBase: 590243, mandatorySvgs: 231.4, disbVol: 7432109, disbVal: 5012344210, disbCust: 5210334, avgTicket: 676.8, repayVol: 9021445, repayVal: 4123456789, repayCust: 4532100, due: 6100.2, outstanding: 1890.4, repayRate: 0.7651 },
    { month: '202304', label: 'Apr 2023', custBase: 612490, mandatorySvgs: 245.1, disbVol: 7812340, disbVal: 5312890100, disbCust: 5490210, avgTicket: 680.2, repayVol: 9234120, repayVal: 4312345678, repayCust: 4710234, due: 6230.5, outstanding: 1760.2, repayRate: 0.7823 },
    { month: '202305', label: 'May 2023', custBase: 643810, mandatorySvgs: 258.7, disbVol: 8023450, disbVal: 5512340120, disbCust: 5612830, avgTicket: 687.4, repayVol: 9512340, repayVal: 4512345600, repayCust: 4912300, due: 6340.1, outstanding: 1640.9, repayRate: 0.7934 },
    { month: '202306', label: 'Jun 2023', custBase: 670234, mandatorySvgs: 271.3, disbVol: 8234560, disbVal: 5723401200, disbCust: 5823100, avgTicket: 692.1, repayVol: 9723450, repayVal: 4734561200, repayCust: 5123400, due: 6520.3, outstanding: 1520.7, repayRate: 0.8012 },
    { month: '202307', label: 'Jul 2023', custBase: 698120, mandatorySvgs: 284.9, disbVol: 8512340, disbVal: 5934120340, disbCust: 6023210, avgTicket: 697.3, repayVol: 9934120, repayVal: 4923401200, repayCust: 5312340, due: 6710.4, outstanding: 1410.3, repayRate: 0.8134 },
    { month: '202308', label: 'Aug 2023', custBase: 723490, mandatorySvgs: 298.2, disbVol: 8723450, disbVal: 6123401200, disbCust: 6212340, avgTicket: 701.8, repayVol: 10123400, repayVal: 5112340120, repayCust: 5512340, due: 6890.2, outstanding: 1310.1, repayRate: 0.8245 },
    { month: '202309', label: 'Sep 2023', custBase: 748930, mandatorySvgs: 312.5, disbVol: 8934560, disbVal: 6312340100, disbCust: 6401230, avgTicket: 705.6, repayVol: 10312340, repayVal: 5301234010, repayCust: 5712340, due: 7023.1, outstanding: 1220.8, repayRate: 0.8356 },
    { month: '202310', label: 'Oct 2023', custBase: 774210, mandatorySvgs: 326.8, disbVol: 9123450, disbVal: 6512340100, disbCust: 6601230, avgTicket: 710.2, repayVol: 10512340, repayVal: 5512340100, repayCust: 5912340, due: 7123.4, outstanding: 1140.5, repayRate: 0.8456 },
    { month: '202311', label: 'Nov 2023', custBase: 801340, mandatorySvgs: 341.2, disbVol: 9312340, disbVal: 6712340100, disbCust: 6801230, avgTicket: 714.8, repayVol: 10712340, repayVal: 5723401200, repayCust: 6112340, due: 7234.5, outstanding: 1070.2, repayRate: 0.8534 },
    { month: '202312', label: 'Dec 2023', custBase: 829120, mandatorySvgs: 356.4, disbVol: 9512340, disbVal: 6923401200, disbCust: 7001230, avgTicket: 719.5, repayVol: 10934120, repayVal: 5934120340, repayCust: 6312340, due: 7345.6, outstanding: 1010.4, repayRate: 0.8612 },
    { month: '202401', label: 'Jan 2024', custBase: 856340, mandatorySvgs: 371.7, disbVol: 9712340, disbVal: 7134120340, disbCust: 7212340, avgTicket: 724.1, repayVol: 11134120, repayVal: 6134120340, repayCust: 6512340, due: 7456.7, outstanding: 960.1, repayRate: 0.8689 },
    { month: '202402', label: 'Feb 2024', custBase: 882340, mandatorySvgs: 386.9, disbVol: 9934120, disbVal: 7345120340, disbCust: 7412340, avgTicket: 728.8, repayVol: 11345120, repayVal: 6345120340, repayCust: 6712340, due: 7567.8, outstanding: 920.3, repayRate: 0.8745 },
    { month: '202403', label: 'Mar 2024', custBase: 908340, mandatorySvgs: 402.2, disbVol: 10134120, disbVal: 7556120340, disbCust: 7612340, avgTicket: 733.5, repayVol: 11556120, repayVal: 6556120340, repayCust: 6912340, due: 7678.9, outstanding: 890.2, repayRate: 0.8801 },
    { month: '202404', label: 'Apr 2024', custBase: 935120, mandatorySvgs: 417.4, disbVol: 10334120, disbVal: 7767120340, disbCust: 7812340, avgTicket: 738.2, repayVol: 11767120, repayVal: 6767120340, repayCust: 7112340, due: 7789.0, outstanding: 868.4, repayRate: 0.8856 },
    { month: '202405', label: 'May 2024', custBase: 962340, mandatorySvgs: 432.7, disbVol: 10534120, disbVal: 7978120340, disbCust: 8012340, avgTicket: 742.9, repayVol: 11978120, repayVal: 6978120340, repayCust: 7312340, due: 7900.1, outstanding: 851.2, repayRate: 0.8912 },
    { month: '202406', label: 'Jun 2024', custBase: 989120, mandatorySvgs: 448.0, disbVol: 10734120, disbVal: 8189120340, disbCust: 8212340, avgTicket: 747.6, repayVol: 12189120, repayVal: 7189120340, repayCust: 7512340, due: 8011.2, outstanding: 838.5, repayRate: 0.8967 },
    { month: '202407', label: 'Jul 2024', custBase: 1015340, mandatorySvgs: 463.2, disbVol: 10934120, disbVal: 8400120340, disbCust: 8412340, avgTicket: 752.3, repayVol: 12400120, repayVal: 7400120340, repayCust: 7712340, due: 8122.3, outstanding: 829.1, repayRate: 0.9012 },
    { month: '202408', label: 'Aug 2024', custBase: 1042120, mandatorySvgs: 478.5, disbVol: 11134120, disbVal: 8611120340, disbCust: 8612340, avgTicket: 757.0, repayVol: 12611120, repayVal: 7611120340, repayCust: 7912340, due: 8233.4, outstanding: 820.3, repayRate: 0.9045 },
    { month: '202409', label: 'Sep 2024', custBase: 1069340, mandatorySvgs: 493.8, disbVol: 11334120, disbVal: 8822120340, disbCust: 8812340, avgTicket: 761.7, repayVol: 12822120, repayVal: 7822120340, repayCust: 8112340, due: 8344.5, outstanding: 812.1, repayRate: 0.9089 },
    { month: '202410', label: 'Oct 2024', custBase: 1096120, mandatorySvgs: 509.1, disbVol: 11534120, disbVal: 9033120340, disbCust: 9012340, avgTicket: 766.4, repayVol: 13033120, repayVal: 8033120340, repayCust: 8312340, due: 8455.6, outstanding: 805.4, repayRate: 0.9134 },
    { month: '202411', label: 'Nov 2024', custBase: 1123340, mandatorySvgs: 524.4, disbVol: 11734120, disbVal: 9244120340, disbCust: 9212340, avgTicket: 771.1, repayVol: 13244120, repayVal: 8244120340, repayCust: 8512340, due: 8566.7, outstanding: 799.2, repayRate: 0.9178 },
    { month: '202412', label: 'Dec 2024', custBase: 1150120, mandatorySvgs: 539.7, disbVol: 11934120, disbVal: 9455120340, disbCust: 9412340, avgTicket: 775.8, repayVol: 13455120, repayVal: 8455120340, repayCust: 8712340, due: 8677.8, outstanding: 793.5, repayRate: 0.9212 },
    { month: '202501', label: 'Jan 2025', custBase: 1178340, mandatorySvgs: 555.0, disbVol: 12134120, disbVal: 9666120340, disbCust: 9612340, avgTicket: 780.5, repayVol: 13666120, repayVal: 8666120340, repayCust: 8912340, due: 8788.9, outstanding: 788.2, repayRate: 0.9245 },
    { month: '202502', label: 'Feb 2025', custBase: 1205120, mandatorySvgs: 570.3, disbVol: 12334120, disbVal: 9877120340, disbCust: 9812340, avgTicket: 785.2, repayVol: 13877120, repayVal: 8877120340, repayCust: 9112340, due: 8900.0, outstanding: 783.4, repayRate: 0.9278 },
    { month: '202503', label: 'Mar 2025', custBase: 1232340, mandatorySvgs: 585.6, disbVol: 12534120, disbVal: 10088120340, disbCust: 10012340, avgTicket: 789.9, repayVol: 14088120, repayVal: 9088120340, repayCust: 9312340, due: 9011.1, outstanding: 779.0, repayRate: 0.9312 },
]

// Bridge product monthly data
export const bridgeMonthlyData = [
    { month: '202411', label: 'Nov 2024', custBase: 150022, mandatorySvgs: 229.3, disbVol: 102311, disbVal: 458505132, disbCust: 87252, avgTicket: 4481.5, repayVol: 66691, repayVal: 75177736, repayCust: 22462, due: 0, outstanding: 0, collectionRate: 0 },
    { month: '202501', label: 'Jan 2025', custBase: 14851, mandatorySvgs: 338.9, disbVol: 146856, disbVal: 677945105, disbCust: 110618, avgTicket: 4616.4, repayVol: 293041, repayVal: 515667988, repayCust: 89392, due: 475.2, outstanding: 28.3, collectionRate: 0.9405 },
    { month: '202502', label: 'Feb 2025', custBase: 48320, mandatorySvgs: 326.4, disbVol: 157440, disbVal: 652732624, disbCust: 125011, avgTicket: 4145.9, repayVol: 311892, repayVal: 572260789, repayCust: 108026, due: 600.7, outstanding: 25.5, collectionRate: 0.9576 },
    { month: '202503', label: 'Mar 2025', custBase: 110138, mandatorySvgs: 447.5, disbVol: 234839, disbVal: 895093303, disbCust: 179477, avgTicket: 3811.5, repayVol: 409263, repayVal: 733037456, repayCust: 142206, due: 744.2, outstanding: 32.1, collectionRate: 0.9569 },
]

// Telco breakdown for current month (Mar 2025)
export const telcoBreakdown = [
    { telco: 'Airtel', disbVal: 7823401200, repayVal: 6823401200, custBase: 892340, repayRate: 0.928 },
    { telco: 'Telkom', disbVal: 2264719140, repayVal: 2064719140, custBase: 339980, repayRate: 0.931 },
]

// Current month KPIs (Mar 2025 — most recent)
export const currentKPIs = {
    disbVal: 10088120340,
    disbVol: 12534120,
    disbCust: 10012340,
    repayVal: 9088120340,
    repayVol: 14088120,
    repayCust: 9312340,
    custBase: 1232340,
    mandatorySvgs: 585.6,
    avgTicket: 789.9,
    repayRate: 0.9312,
    outstanding: 779.0,
    due: 9011.1,
    interestAccrued: 1234567890,
    interestPaid: 1123456789,
}

// Last month KPIs for delta calculation (Feb 2025)
export const prevKPIs = {
    disbVal: 9877120340,
    disbVol: 12334120,
    disbCust: 9812340,
    repayVal: 8877120340,
    repayVol: 13877120,
    repayCust: 9112340,
    custBase: 1205120,
    mandatorySvgs: 570.3,
    avgTicket: 785.2,
    repayRate: 0.9278,
    outstanding: 783.4,
    due: 8900.0,
}

// Monthly interest & penalty data (accrued vs paid)
// Paid is typically 85–92% of accrued, improving over time
export const interestMonthlyData = [
    { month: '202303', label: 'Mar 2023', accrued: 412340120, paid: 348127580 },
    { month: '202304', label: 'Apr 2023', accrued: 438120340, paid: 373234290 },
    { month: '202305', label: 'May 2023', accrued: 461230450, paid: 396658287 },
    { month: '202306', label: 'Jun 2023', accrued: 487340120, paid: 421973983 },
    { month: '202307', label: 'Jul 2023', accrued: 512450230, paid: 447833950 },
    { month: '202308', label: 'Aug 2023', accrued: 538560340, paid: 473933099 },
    { month: '202309', label: 'Sep 2023', accrued: 563670450, paid: 499854498 },
    { month: '202310', label: 'Oct 2023', accrued: 589780560, paid: 527203800 },
    { month: '202311', label: 'Nov 2023', accrued: 614890670, paid: 553401603 },
    { month: '202312', label: 'Dec 2023', accrued: 640000780, paid: 582400710 },
    { month: '202401', label: 'Jan 2024', accrued: 665110890, paid: 611901819 },
    { month: '202402', label: 'Feb 2024', accrued: 690221000, paid: 639954525 },
    { month: '202403', label: 'Mar 2024', accrued: 715331110, paid: 667758784 },
    { month: '202404', label: 'Apr 2024', accrued: 741441220, paid: 697254847 },
    { month: '202405', label: 'May 2024', accrued: 766551330, paid: 726122863 },
    { month: '202406', label: 'Jun 2024', accrued: 791661440, paid: 754901609 },
    { month: '202407', label: 'Jul 2024', accrued: 817771550, paid: 783459887 },
    { month: '202408', label: 'Aug 2024', accrued: 842881660, paid: 812369497 },
    { month: '202409', label: 'Sep 2024', accrued: 867991770, paid: 842551916 },
    { month: '202410', label: 'Oct 2024', accrued: 893101880, paid: 872779535 },
    { month: '202411', label: 'Nov 2024', accrued: 919211990, paid: 904393503 },
    { month: '202412', label: 'Dec 2024', accrued: 944322100, paid: 934878879 },
    { month: '202501', label: 'Jan 2025', accrued: 969432210, paid: 959137988 },
    { month: '202502', label: 'Feb 2025', accrued: 1005342310, paid: 993288686 },
    { month: '202503', label: 'Mar 2025', accrued: 1034567890, paid: 1023221811 },
]

// Monthly disbursement data split by Airtel vs Telkom (Individuals)
// Airtel ~78% share, Telkom ~22%
export const telcoMonthlyDisb = [
    { month: '202303', label: 'Mar 2023', airtelVal: 3909628804, telkomVal: 1102715406, airtelVol: 5797045, telkomVol: 1635064, airtelTicket: 674.4, telkomTicket: 674.5 },
    { month: '202304', label: 'Apr 2023', airtelVal: 4143894478, telkomVal: 1168995622, airtelVol: 6093625, telkomVol: 1718715, airtelTicket: 679.9, telkomTicket: 680.2 },
    { month: '202305', label: 'May 2023', airtelVal: 4299625294, telkomVal: 1212714826, airtelVol: 6258291, telkomVol: 1765159, airtelTicket: 687.0, telkomTicket: 686.8 },
    { month: '202306', label: 'Jun 2023', airtelVal: 4464252936, telkomVal: 1259148264, airtelVol: 6422957, telkomVol: 1811603, airtelTicket: 695.0, telkomTicket: 695.0 },
    { month: '202307', label: 'Jul 2023', airtelVal: 4628613865, telkomVal: 1305506475, airtelVol: 6639625, telkomVol: 1872715, airtelTicket: 697.1, telkomTicket: 697.1 },
    { month: '202308', label: 'Aug 2023', airtelVal: 4776252936, telkomVal: 1347148264, airtelVol: 6804291, telkomVol: 1919159, airtelTicket: 701.9, telkomTicket: 702.0 },
    { month: '202309', label: 'Sep 2023', airtelVal: 4923625278, telkomVal: 1388714822, airtelVol: 6969157, telkomVol: 1965403, airtelTicket: 706.8, telkomTicket: 707.0 },
    { month: '202310', label: 'Oct 2023', airtelVal: 5079625278, telkomVal: 1432714822, airtelVol: 7116291, telkomVol: 2007159, airtelTicket: 713.8, telkomTicket: 714.0 },
    { month: '202311', label: 'Nov 2023', airtelVal: 5235625278, telkomVal: 1476714822, airtelVol: 7263625, telkomVol: 2048715, airtelTicket: 720.8, telkomTicket: 721.0 },
    { month: '202312', label: 'Dec 2023', airtelVal: 5400252936, telkomVal: 1523148264, airtelVol: 7419625, telkomVol: 2092715, airtelTicket: 728.0, telkomTicket: 728.3 },
    { month: '202401', label: 'Jan 2024', airtelVal: 5564813865, telkomVal: 1569306475, airtelVol: 7575625, telkomVol: 2136715, airtelTicket: 734.5, telkomTicket: 734.2 },
    { month: '202402', label: 'Feb 2024', airtelVal: 5729194065, telkomVal: 1615926275, airtelVol: 7749213, telkomVol: 2184907, airtelTicket: 739.3, telkomTicket: 739.0 },
    { month: '202403', label: 'Mar 2024', airtelVal: 5893773865, telkomVal: 1662346475, airtelVol: 7904613, telkomVol: 2229507, airtelTicket: 745.6, telkomTicket: 745.0 },
    { month: '202404', label: 'Apr 2024', airtelVal: 6058353865, telkomVal: 1708766475, airtelVol: 8060613, telkomVol: 2273507, airtelTicket: 751.8, telkomTicket: 751.5 },
    { month: '202405', label: 'May 2024', airtelVal: 6222933865, telkomVal: 1755186475, airtelVol: 8216613, telkomVol: 2317507, airtelTicket: 757.7, telkomTicket: 757.5 },
    { month: '202406', label: 'Jun 2024', airtelVal: 6387513865, telkomVal: 1801606475, airtelVol: 8372613, telkomVol: 2361507, airtelTicket: 763.0, telkomTicket: 763.0 },
    { month: '202407', label: 'Jul 2024', airtelVal: 6552093865, telkomVal: 1848026475, airtelVol: 8528613, telkomVol: 2405507, airtelTicket: 768.3, telkomTicket: 768.3 },
    { month: '202408', label: 'Aug 2024', airtelVal: 6716673865, telkomVal: 1894446475, airtelVol: 8684613, telkomVol: 2449507, airtelTicket: 773.4, telkomTicket: 773.3 },
    { month: '202409', label: 'Sep 2024', airtelVal: 6881253865, telkomVal: 1940866475, airtelVol: 8840613, telkomVol: 2493507, airtelTicket: 778.3, telkomTicket: 778.1 },
    { month: '202410', label: 'Oct 2024', airtelVal: 7045833865, telkomVal: 1987286475, airtelVol: 8996613, telkomVol: 2537507, airtelTicket: 783.2, telkomTicket: 783.0 },
    { month: '202411', label: 'Nov 2024', airtelVal: 7210413865, telkomVal: 2033706475, airtelVol: 9152613, telkomVol: 2581507, airtelTicket: 787.8, telkomTicket: 787.5 },
    { month: '202412', label: 'Dec 2024', airtelVal: 7374993865, telkomVal: 2080126475, airtelVol: 9308613, telkomVol: 2625507, airtelTicket: 793.3, telkomTicket: 793.0 },
    { month: '202501', label: 'Jan 2025', airtelVal: 7539573865, telkomVal: 2126546475, airtelVol: 9464613, telkomVol: 2669507, airtelTicket: 796.8, telkomTicket: 796.7 },
    { month: '202502', label: 'Feb 2025', airtelVal: 7704153865, telkomVal: 2172966475, airtelVol: 9620613, telkomVol: 2713507, airtelTicket: 800.8, telkomTicket: 800.9 },
    { month: '202503', label: 'Mar 2025', airtelVal: 7868733865, telkomVal: 2219386475, airtelVol: 9776613, telkomVol: 2757507, airtelTicket: 805.4, telkomTicket: 805.3 },
]

// Monthly disbursement data split by Individuals vs Groups
// Groups started Jun 2023, ~5% of volume, ~8% of value (larger avg ticket)
export const segmentMonthlyDisb = [
    { month: '202303', label: 'Mar 2023', indivVal: 5012344210, groupsVal: 0, indivVol: 7432109, groupsVol: 0, indivTicket: 676.8, groupsTicket: 0 },
    { month: '202304', label: 'Apr 2023', indivVal: 5312890100, groupsVal: 0, indivVol: 7812340, groupsVol: 0, indivTicket: 680.2, groupsTicket: 0 },
    { month: '202305', label: 'May 2023', indivVal: 5512340120, groupsVal: 0, indivVol: 8023450, groupsVol: 0, indivTicket: 687.4, groupsTicket: 0 },
    { month: '202306', label: 'Jun 2023', indivVal: 5266128904, groupsVal: 457272296, indivVol: 7666061, groupsVol: 568499, indivTicket: 687.0, groupsTicket: 804.4 },
    { month: '202307', label: 'Jul 2023', indivVal: 5460590713, groupsVal: 473529627, indivVol: 7931156, groupsVol: 581184, indivTicket: 688.5, groupsTicket: 814.8 },
    { month: '202308', label: 'Aug 2023', indivVal: 5633729024, groupsVal: 489672176, indivVol: 8112658, groupsVol: 610792, indivTicket: 694.5, groupsTicket: 801.7 },
    { month: '202309', label: 'Sep 2023', indivVal: 5807352892, groupsVal: 504987208, indivVol: 8309241, groupsVol: 625319, indivTicket: 698.9, groupsTicket: 807.6 },
    { month: '202310', label: 'Oct 2023', indivVal: 5991352892, groupsVal: 520987208, indivVol: 8484748, groupsVol: 638702, indivTicket: 706.8, groupsTicket: 815.6 },
    { month: '202311', label: 'Nov 2023', indivVal: 6175352892, groupsVal: 536987208, indivVol: 8660255, groupsVol: 652085, indivTicket: 713.0, groupsTicket: 823.5 },
    { month: '202312', label: 'Dec 2023', indivVal: 6369352892, groupsVal: 554048308, indivVol: 8838255, groupsVol: 674085, indivTicket: 720.7, groupsTicket: 822.1 },
    { month: '202401', label: 'Jan 2024', airtelVal: 5564813865, indivVal: 6563352892, groupsVal: 570767448, indivVol: 9009255, groupsVol: 703085, indivTicket: 728.5, groupsTicket: 811.8 },
    { month: '202402', label: 'Feb 2024', indivVal: 6757352892, groupsVal: 587767448, indivVol: 9180255, groupsVol: 753085, indivTicket: 735.9, groupsTicket: 780.5 },
    { month: '202403', label: 'Mar 2024', indivVal: 6951352892, groupsVal: 604767448, indivVol: 9356255, groupsVol: 777865, indivTicket: 743.1, groupsTicket: 777.0 },
    { month: '202404', label: 'Apr 2024', indivVal: 7145352892, groupsVal: 621767448, indivVol: 9533255, groupsVol: 801085, indivTicket: 749.6, groupsTicket: 776.2 },
    { month: '202405', label: 'May 2024', indivVal: 7339352892, groupsVal: 638767448, indivVol: 9709255, groupsVol: 824865, indivTicket: 755.9, groupsTicket: 774.7 },
    { month: '202406', label: 'Jun 2024', indivVal: 7534352892, groupsVal: 654767448, indivVol: 9885255, groupsVol: 848865, indivTicket: 762.2, groupsTicket: 771.4 },
    { month: '202407', label: 'Jul 2024', indivVal: 7729352892, groupsVal: 670767448, indivVol: 10061255, groupsVol: 872865, indivTicket: 768.3, groupsTicket: 768.4 },
    { month: '202408', label: 'Aug 2024', indivVal: 7924352892, groupsVal: 686767448, indivVol: 10237255, groupsVol: 896865, indivTicket: 774.0, groupsTicket: 765.8 },
    { month: '202409', label: 'Sep 2024', indivVal: 8119352892, groupsVal: 702767448, indivVol: 10413255, groupsVol: 920865, indivTicket: 779.7, groupsTicket: 763.1 },
    { month: '202410', label: 'Oct 2024', indivVal: 8314352892, groupsVal: 718767448, indivVol: 10589255, groupsVol: 944865, indivTicket: 785.2, groupsTicket: 761.0 },
    { month: '202411', label: 'Nov 2024', indivVal: 8509352892, groupsVal: 734767448, indivVol: 10765255, groupsVol: 968865, indivTicket: 790.5, groupsTicket: 758.8 },
    { month: '202412', label: 'Dec 2024', indivVal: 8704352892, groupsVal: 750767448, indivVol: 10941255, groupsVol: 992865, indivTicket: 795.5, groupsTicket: 756.0 },
    { month: '202501', label: 'Jan 2025', indivVal: 8899352892, groupsVal: 766767448, indivVol: 11117255, groupsVol: 1016865, indivTicket: 800.5, groupsTicket: 754.0 },
    { month: '202502', label: 'Feb 2025', indivVal: 9094352892, groupsVal: 782767448, indivVol: 11293255, groupsVol: 1040865, indivTicket: 805.3, groupsTicket: 752.0 },
    { month: '202503', label: 'Mar 2025', indivVal: 9289352892, groupsVal: 798767448, indivVol: 11469255, groupsVol: 1064865, indivTicket: 810.1, groupsTicket: 750.0 },
]

// Monthly savings data — Mandatory, Voluntary, Withdrawals
// Mandatory savings = opt-in linked deductions (from monthlyData.mandatorySvgs in Mn)
// Voluntary savings started gradually from mid-2023; withdrawals grew alongside
export const savingsMonthlyData = [
    { month: '202303', label: 'Mar 2023', mandatoryVal: 231400000, mandatoryVol: 7432109, voluntaryVal: 0, voluntaryVol: 0, withdrawnVal: 0, withdrawnVol: 0 },
    { month: '202304', label: 'Apr 2023', mandatoryVal: 245100000, mandatoryVol: 7812340, voluntaryVal: 0, voluntaryVol: 0, withdrawnVal: 0, withdrawnVol: 0 },
    { month: '202305', label: 'May 2023', mandatoryVal: 258700000, mandatoryVol: 8023450, voluntaryVal: 0, voluntaryVol: 0, withdrawnVal: 0, withdrawnVol: 0 },
    { month: '202306', label: 'Jun 2023', mandatoryVal: 271300000, mandatoryVol: 8234560, voluntaryVal: 12340000, voluntaryVol: 14230, withdrawnVal: 1200000, withdrawnVol: 1120 },
    { month: '202307', label: 'Jul 2023', mandatoryVal: 284900000, mandatoryVol: 8512340, voluntaryVal: 23450000, voluntaryVol: 27810, withdrawnVal: 2400000, withdrawnVol: 2230 },
    { month: '202308', label: 'Aug 2023', mandatoryVal: 298200000, mandatoryVol: 8723450, voluntaryVal: 38900000, voluntaryVol: 44320, withdrawnVal: 3800000, withdrawnVol: 3540 },
    { month: '202309', label: 'Sep 2023', mandatoryVal: 312500000, mandatoryVol: 8934560, voluntaryVal: 57600000, voluntaryVol: 64120, withdrawnVal: 5600000, withdrawnVol: 5240 },
    { month: '202310', label: 'Oct 2023', mandatoryVal: 326800000, mandatoryVol: 9123450, voluntaryVal: 79800000, voluntaryVol: 88230, withdrawnVal: 7800000, withdrawnVol: 7290 },
    { month: '202311', label: 'Nov 2023', mandatoryVal: 341200000, mandatoryVol: 9312340, voluntaryVal: 105600000, voluntaryVol: 116340, withdrawnVal: 10200000, withdrawnVol: 9540 },
    { month: '202312', label: 'Dec 2023', mandatoryVal: 356400000, mandatoryVol: 9512340, voluntaryVal: 134200000, voluntaryVol: 148230, withdrawnVal: 13000000, withdrawnVol: 12120 },
    { month: '202401', label: 'Jan 2024', mandatoryVal: 371700000, mandatoryVol: 9712340, voluntaryVal: 166100000, voluntaryVol: 183450, withdrawnVal: 16100000, withdrawnVol: 15080 },
    { month: '202402', label: 'Feb 2024', mandatoryVal: 386900000, mandatoryVol: 9934120, voluntaryVal: 201000000, voluntaryVol: 221340, withdrawnVal: 19400000, withdrawnVol: 18210 },
    { month: '202403', label: 'Mar 2024', mandatoryVal: 402200000, mandatoryVol: 10134120, voluntaryVal: 238300000, voluntaryVol: 262890, withdrawnVal: 23000000, withdrawnVol: 21600 },
    { month: '202404', label: 'Apr 2024', mandatoryVal: 417400000, mandatoryVol: 10334120, voluntaryVal: 278100000, voluntaryVol: 306780, withdrawnVal: 26900000, withdrawnVol: 25240 },
    { month: '202405', label: 'May 2024', mandatoryVal: 432700000, mandatoryVol: 10534120, voluntaryVal: 320800000, voluntaryVol: 353890, withdrawnVal: 31100000, withdrawnVol: 29250 },
    { month: '202406', label: 'Jun 2024', mandatoryVal: 448000000, mandatoryVol: 10734120, voluntaryVal: 366200000, voluntaryVol: 403560, withdrawnVal: 35500000, withdrawnVol: 33380 },
    { month: '202407', label: 'Jul 2024', mandatoryVal: 463200000, mandatoryVol: 10934120, voluntaryVal: 414500000, voluntaryVol: 456120, withdrawnVal: 40200000, withdrawnVol: 37810 },
    { month: '202408', label: 'Aug 2024', mandatoryVal: 478500000, mandatoryVol: 11134120, voluntaryVal: 465800000, voluntaryVol: 511340, withdrawnVal: 45100000, withdrawnVol: 42490 },
    { month: '202409', label: 'Sep 2024', mandatoryVal: 493800000, mandatoryVol: 11334120, voluntaryVal: 520100000, voluntaryVol: 569230, withdrawnVal: 50300000, withdrawnVol: 47400 },
    { month: '202410', label: 'Oct 2024', mandatoryVal: 509100000, mandatoryVol: 11534120, voluntaryVal: 577400000, voluntaryVol: 630120, withdrawnVal: 55700000, withdrawnVol: 52600 },
    { month: '202411', label: 'Nov 2024', mandatoryVal: 524400000, mandatoryVol: 11734120, voluntaryVal: 637700000, voluntaryVol: 693900, withdrawnVal: 61400000, withdrawnVol: 58010 },
    { month: '202412', label: 'Dec 2024', mandatoryVal: 539700000, mandatoryVol: 11934120, voluntaryVal: 701000000, voluntaryVol: 761560, withdrawnVal: 67300000, withdrawnVol: 63700 },
    { month: '202501', label: 'Jan 2025', mandatoryVal: 555000000, mandatoryVol: 12134120, voluntaryVal: 767300000, voluntaryVol: 832230, withdrawnVal: 73400000, withdrawnVol: 69560 },
    { month: '202502', label: 'Feb 2025', mandatoryVal: 570300000, mandatoryVol: 12334120, voluntaryVal: 836600000, voluntaryVol: 906780, withdrawnVal: 79800000, withdrawnVol: 75630 },
    { month: '202503', label: 'Mar 2025', mandatoryVal: 585600000, mandatoryVol: 12534120, voluntaryVal: 909000000, voluntaryVol: 984340, withdrawnVal: 86500000, withdrawnVol: 82050 },
]
