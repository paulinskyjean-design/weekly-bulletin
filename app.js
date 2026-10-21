/**
 * 埔心基督徒聚會處週報 - 手機直式互動資訊網核心程式 (app.js)
 * 支援多期週報資料切換 (第1516期最新 / 第1515期前期)、即時檢索、Web Audio 合成音效、代禱愛心、彩帶特效等
 */

// ==========================================
// 1. 週報完整資料庫 (Issue 1516 & Issue 1515)
// ==========================================
const bulletinDatabase = {
  // --------- 第 1516 期 (2026年10月18日 最新) ---------
  '1516': {
    issueNumber: '1516',
    dateText: '主後 2026 年 10 月 18 日',
    motto: '《全心倚賴耶和華、一切事上認定主》',
    noticeText: '主日崇拜後將舉行「全教會秋季大掃除」，打掃後備有愛心便當（副堂領取）；詩班隨後將練唱詩歌《親愛耶穌》，歡迎齊心服事！',
    verse: {
      quote: '「你要保守你心，勝過保守一切，因為一生的果效是由心發出。」',
      ref: '—— 箴言第四章 23 節',
      contextTitle: '箴言第四章 20～23 節',
      contextText: `20 我兒，要留心聽我的言詞，側耳聽我的話語，
21 都不可離你的眼目，要存記在你心裡。
22 因為尋得祂的，就得了生命，又得了醫全體的良藥。
23 你要保守你心，勝過保守一切，因為一生的果效是由心發出。`
    },
    sermon: {
      title: '人者「心」之器',
      speaker: '葉文漢 牧師（彌賽亞全人關懷協會）',
      passage: '箴言第四章 20～23 節',
      desc: '感謝彌賽亞全人關懷協會葉文漢牧師前來傳講信息並分享協會事工。願上帝保守我們的心懷意念，天天得享主恩沛降。'
    },
    worship: {
      speaker: '葉文漢 牧師',
      leader: '臧自強 弟兄',
      praiseLeader: '臧自強 弟兄',
      timeline: [
        { title: '會前禱告', role: '主日司會', desc: '為教會/同工禱告' },
        { title: '序 樂', role: '全體會眾', desc: '安靜等候' },
        {
          title: '宣 召',
          role: '主日司會',
          desc: '詩篇 95 篇 1～3 節、6～7 節',
          hasAccordion: true,
          accordionId: 'accCall1516',
          accordionContent: `「1 來啊，我們要向耶和華歌唱，向拯救我們的磐石歡呼！<br>
2 我們要來感謝祂，用詩歌向祂歡呼！<br>
3 因耶和華為大神，為大王，超乎萬神之上。<br>
6 來啊，我們要屈身敬拜，在造我們的耶和華面前跪下。<br>
7 因為祂是我們的神；我們是祂草場的羊，是祂手下的民。」`
        },
        {
          title: '敬拜讚美',
          role: '臧自強 弟兄',
          isPraise: true,
          hymns: ['唯有耶穌 ＋ 祢是配得', '當轉眼仰望耶穌', '祢的話']
        },
        {
          title: '講台信息',
          role: '葉文漢 牧師',
          isSermon: true,
          sermonTitle: '人者「心」之器',
          passage: '經文：箴言第四章 20～23 節'
        },
        {
          title: '教會報告 / 本週金句',
          role: '主日司會',
          hasSpecialAward: true,
          awardTitle: '【頒發學生獎學金】',
          awardDesc: '頒發成績優良獎與進步獎，表揚勤勉向學之主內學子！'
        },
        {
          title: '主 禱 文',
          role: '全體會眾',
          desc: '馬太福音 6 章 9～13 節',
          hasLordsPrayer: true
        },
        { title: '聖 餐', role: '江茂松 牧師', desc: '擘餅記念主' },
        { title: '三一頌 • 祝禱 • 阿們頌', role: '會眾 • 江牧師', desc: '領受上帝從天而降的祝福' },
        { title: '互道平安', role: '全體會眾', desc: '彼此祝福' }
      ]
    },
    birthdays: [
      { name: '王樂禾', day: 1 }, { name: '王德馨', day: 2 }, { name: '王志駿', day: 5 },
      { name: '魏紹霞', day: 8 }, { name: '孫慶華', day: 9 }, { name: '楊雅慧', day: 13 },
      { name: '吳鴻珠', day: 17 }, { name: '魏翠珍', day: 19, highlight: true },
      { name: '林靜宜', day: 20, highlight: true }, { name: '方淑儀', day: 22 },
      { name: '周裕宸', day: 22 }, { name: '呂睿杰', day: 23 }, { name: '傅幼斌', day: 28 },
      { name: '黃李玉枝', day: 31 }
    ],
    news: [
      { num: '01', title: '感謝講員葉文漢牧師', tag: '主日講道', desc: '感謝彌賽亞全人關懷協會葉文漢牧師前來傳講信息並分享協會事工。願主賜福葉牧師的服事以及協會事工。' },
      { num: '02', title: '每日晨更聚會', tag: '每日晨更', desc: '教會週一至週六早上 07:30 到 08:30 晨更，歡迎弟兄姊妹們參加。本週閱讀由新約聖經羅馬書第 16 章起。' },
      { num: '03', title: '週六守望禱告會', tag: '禱告會', desc: '禮拜六下午 17:30 到 18:30 的禱告會，邀請弟兄姊妹同來為各樣事情關懷代禱。' },
      { num: '04', title: '讀經總動員：舊約進度', tag: '讀經進度', desc: '全教會舊約讀經計畫，本週的進度是由詩篇第 45 章起。' },
      { num: '05', title: '2026年十月份壽星', tag: '壽星祝賀', isBirthdayHighlight: true },
      {
        num: '06',
        title: '主日崇拜頒發學生獎學金',
        tag: '學生獎學金',
        isScholarship: true,
        desc: '今天(10月18日)主日崇拜中頒發獎學金，恭喜得獎同學：',
        awards: {
          good: ['張艾立', '周裕恩', '張敬侑', '曾義謙', '李奇勁', '金宣愛', '李侒倫', '金宣恩'],
          progress: ['李惇育']
        }
      },
      { num: '07', title: '全教會秋季大掃除與愛心便當', tag: '大掃除愛宴', desc: '今天(10月18日)主日崇拜後，將進行全教會秋季大掃除，齊來清掃會堂。打掃後有預備愛心便當，請至副堂領取。' },
      { num: '08', title: '詩班練唱與獻詩邀請', tag: '詩班事工', desc: '教會詩班於今天(10月18日)主日崇拜後練唱詩歌《親愛耶穌》，並在下週日(10月25日)主日崇拜時獻詩，誠邀參加練唱。' }
    ],
    prayers: [
      {
        id: '1516-world',
        category: 'badge-world',
        categoryName: '國際局勢代禱',
        icon: 'fa-earth-americas',
        items: [
          { num: '①', title: '中東和平代禱', desc: '美以 10 月 15 日磋商對伊朗新打擊預案，美媒稱美軍考慮動用炸彈之母轟炸核與能源設施，荷莫茲關閉致肥料短缺恐引發糧食危機。求主攔阻大戰升級。' },
          { num: '②', title: '俄烏戰事止息', desc: '俄軍空襲基洛夫格勒、敖德薩、基輔逾 10 小時，平民死傷慘重。求主止息對能源與平民的報復攻擊，保守無辜，賜和平出路。' }
        ]
      },
      {
        id: '1516-health',
        category: 'badge-health',
        categoryName: '身體健康與醫治',
        icon: 'fa-heart-circle-bolt',
        items: [
          { num: '①', title: '劉時傑弟兄（憲萍姊妹女婿）', desc: '將於 10 月 29 日接受鼻中隔彎曲手術，誠請弟兄姊妹為時傑手術順利關懷代禱。' },
          { num: '②', title: '苑玲姊妹', desc: '膝關節積水已多日，請弟兄姊妹關懷代禱，期盼早日得醫治。' },
          { num: '③', title: '呂秋娥女士（慕道友）', desc: '罹患乳癌，全身疼痛無力，有意願相信耶穌，求神慈愛臨到，醫治減輕病痛，得著救恩。' },
          { num: '④', title: '清美姊妹', desc: '最近因暈眩，在五福公園晨運時跌坐數次，請為清美姊妹身心靈健壯關懷代禱。' }
        ]
      },
      {
        id: '1516-church',
        category: 'badge-church',
        categoryName: '教會牧養與聖工',
        icon: 'fa-church',
        items: [
          { num: '①', title: '聘請學生傳道', desc: '教會聘牧小組目前正在聘請學生傳道，請為尋得忠心服事的適合人選關懷代禱。' },
          { num: '②', title: '續任傳道人', desc: '請為未來續任傳道人的聘請關懷代禱。' },
          { num: '③', title: '十月份主日領會及講員', desc: '為 10 月 25 日主日領會金振群弟兄、講員江茂松牧師代禱。' }
        ]
      },
      {
        id: '1516-edu',
        category: 'badge-edu',
        categoryName: '青年求學與就業',
        icon: 'fa-graduation-cap',
        items: [
          { num: '①', title: '忻慧姊妹紐約研習', desc: '獲教育部青年署補助，於 10 月 13 日～11 月 5 日赴紐約研習音樂劇推廣及教學融入，求主保守旅途平安及生活學習，也為返台後合適工作代禱。' },
          { num: '②', title: '高中應屆考生學測', desc: '為高三生奇勁、鍾羽、念恩、祖岑、鍾昀軒參加明年學測（1月22-24日）禱告。' },
          { num: '③', title: '大學應屆畢業生', desc: '為宣愛、以諾、傅興、奇叡、敬翔、宇謙未來的就業與升學代禱。宣愛明年（6月13-14日）將參加警察特考。' }
        ]
      },
      {
        id: '1516-military',
        category: 'badge-military',
        categoryName: '弟兄服兵役平安',
        icon: 'fa-shield-halved',
        items: [
          { num: '①', title: '金宣恩弟兄新兵訓練', desc: '於 10 月 7 日～11 月 6 日在成功嶺訓練中心接受新兵訓練，結訓後服五個月替代役，請為軍中適應與分發至合適替代役單位代禱。' }
        ]
      }
    ],
    roster: {
      thisLabel: '本週 (10.18)',
      nextLabel: '下週 (10.25)',
      thisWeek: [
        { role: '講員', name: '葉文漢 牧師', isHighlight: true, icon: 'fa-microphone' },
        { role: '司會', name: '臧自強 弟兄', icon: 'fa-user-check' },
        { role: '司樂', name: '彭鈴玉、馬浥辰', icon: 'fa-music' },
        { role: '陪唱', name: '謝琇婷、金宣愛、傅興', icon: 'fa-guitar' },
        { role: '投影音控', name: '胡夢嵩、臧美倫', icon: 'fa-sliders' },
        { role: '招待', name: '金振群、曾繁萍、吳連碧', icon: 'fa-door-open' },
        { role: '聖餐', name: '謝琇婷、金宣愛、傅興', icon: 'fa-wine-glass' },
        { role: '司獻', name: '黃穗蓉、臧自強、馬浥辰', icon: 'fa-hand-holding-dollar' },
        { role: '插花服事', name: '王樂禾', icon: 'fa-spa' },
        { role: '兒童主日學 (10/18)', name: '羅偉榕 老師 ＋ 楊素英 老師', isFull: true, icon: 'fa-children' }
      ],
      nextWeek: [
        { role: '講員', name: '江茂松 牧師', isHighlight: true, icon: 'fa-microphone' },
        { role: '司會', name: '金振群 弟兄', icon: 'fa-user-check' },
        { role: '司樂', name: '曾繁萍、魏恩予', icon: 'fa-music' },
        { role: '陪唱', name: '王富次、阮卓蘭、臧美倫', icon: 'fa-guitar' },
        { role: '投影音控', name: '張永裕、鄒佳芬', icon: 'fa-sliders' },
        { role: '招待', name: '魏紹霞、吳秀惠、涂秀娟', icon: 'fa-door-open' },
        { role: '聖餐', name: '王富次、阮卓蘭、臧美倫', icon: 'fa-wine-glass' },
        { role: '司獻', name: '李秀娟、金振群、魏恩予', icon: 'fa-hand-holding-dollar' },
        { role: '插花服事', name: '王樂禾', icon: 'fa-spa' }
      ]
    },
    offering: {
      dateTitle: '10 月 11 日 奉獻／收入明細',
      tithes: [
        { id: '編號 1', amount: '$4,200' }, { id: '編號 4', amount: '$27,500' }, { id: '編號 8', amount: '$2,500' },
        { id: '編號 16', amount: '$1,000' }, { id: '編號 51', amount: '$3,000' }, { id: '編號 60', amount: '$3,000' },
        { id: '編號 61', amount: '$3,000' }, { id: '編號 67', amount: '$8,000' }, { id: '編號 69', amount: '$4,500' },
        { id: '編號 93', amount: '$3,500' }, { id: '編號 96', amount: '$2,000' },
        { id: '主知名 1', amount: '$60,000', highlight: true }, { id: '主知名 2', amount: '$100,000', highlight: true }
      ],
      titheSubtotal: '222,200',
      sundayOffering: '3,600',
      weekTotal: '225,800',
      monthTotal: '312,000'
    }
  },

  // --------- 第 1515 期 (2026年10月11日 前期存檔) ---------
  '1515': {
    issueNumber: '1515',
    dateText: '主後 2026 年 10 月 11 日',
    motto: '《全心倚賴耶和華、一切事上認定主》',
    noticeText: '今天(10月11日)崇拜後召開十月份長執同工會議；下週主日(10/18)將頒發獎學金並舉行全教會大掃除，請向小家長登記便當人數！',
    verse: {
      quote: '「一切都是出於 神；他藉著基督使我們與他和好，又將勸人與他和好的職分賜給我們。」',
      ref: '—— 哥林多後書第五章 18 節',
      contextTitle: '哥林多後書第五章 14～20 節',
      contextText: `14 原來基督的愛激勵我們；因我們想，一人既替眾人死，眾人就都死了；
15 並且他替眾人死，是叫那些活著的人不再為自己活，乃為替他們死而復活的主活。
17 若有人在基督裡，他就是新造的人，舊事已過，都變成新的了。
18 一切都是出於 神；他藉著基督使我們與他和好，又將勸人與他和好的職分賜給我們。
20 所以，我們作基督的使者，就好像神藉我們勸你們一般。我們替基督求你們，與神和好。`
    },
    sermon: {
      title: '傳福音的省思',
      speaker: '江茂松 牧師',
      passage: '哥林多後書第五章 14～20 節',
      desc: '基督將勸人與神和好的職分託付給屬祂的兒女。願每位弟兄姊妹受基督的愛激勵，忠心作和平與救恩的使者。'
    },
    worship: {
      speaker: '江茂松 牧師',
      leader: '馬煜堃 弟兄',
      praiseLeader: '馬煜堃 弟兄',
      timeline: [
        { title: '會前禱告', role: '主日司會', desc: '為教會/同工禱告' },
        { title: '序 樂', role: '全體會眾', desc: '安靜等候' },
        {
          title: '宣 召',
          role: '主日司會',
          desc: '出埃及記 40 章 34 節',
          hasAccordion: true,
          accordionId: 'accCall1515',
          accordionContent: `「當時，雲彩遮蓋會幕，耶和華的榮光就充滿了帳幕。」(出埃及記 40:34)`
        },
        {
          title: '敬拜讚美',
          role: '馬煜堃 弟兄',
          isPraise: true,
          hymns: ['神的聖靈', '聖靈請祢來', '我有一位好朋友']
        },
        {
          title: '講台信息',
          role: '江茂松 牧師',
          isSermon: true,
          sermonTitle: '傳福音的省思',
          passage: '經文：哥林多後書第五章 14～20 節'
        },
        {
          title: '教會報告 / 本週金句',
          role: '主日司會',
          hasSpecialAward: true,
          awardTitle: '【頒發2026年第三季完成讀經進度獎金】',
          awardDesc: '頒發讀經進度獎金，勉勵全體弟兄姊妹天天得著神話語的滋養！'
        },
        {
          title: '主 禱 文',
          role: '全體會眾',
          desc: '馬太福音 6 章 9～13 節',
          hasLordsPrayer: true
        },
        { title: '聖 餐', role: '江茂松 牧師', desc: '擘餅記念主' },
        { title: '三一頌 • 祝禱 • 阿們頌', role: '會眾 • 江牧師', desc: '領受上帝從天而降的祝福' },
        { title: '互道平安', role: '全體會眾', desc: '彼此祝福' }
      ]
    },
    birthdays: [
      { name: '王樂禾', day: 1 }, { name: '王德馨', day: 2 }, { name: '王志駿', day: 5 },
      { name: '魏紹霞', day: 8 }, { name: '孫慶華', day: 9 }, { name: '楊雅慧', day: 13 },
      { name: '吳鴻珠', day: 17 }, { name: '魏翠珍', day: 19 }, { name: '林靜宜', day: 20 },
      { name: '方淑儀', day: 22 }, { name: '周裕宸', day: 22 }, { name: '呂睿杰', day: 23 },
      { name: '傅幼斌', day: 28 }, { name: '黃李玉枝', day: 31 }
    ],
    news: [
      { num: '01', title: '每日晨更聚會', tag: '每日晨更', desc: '教會週一至週六早上 07:30 到 08:30 晨更，本週閱讀由新約聖經羅馬書第 9 章起。' },
      { num: '02', title: '週六守望禱告會', tag: '禱告會', desc: '禮拜六下午 17:30 到 18:30 的禱告會，邀請同來為各樣事情關懷代禱。' },
      { num: '03', title: '讀經總動員：舊約進度', tag: '讀經進度', desc: '舊約讀經計畫持續進行中，本週進度是由詩篇第 39 章起。' },
      { num: '04', title: '十月份壽星祝賀', tag: '壽星祝賀', isBirthdayHighlight: true },
      { num: '05', title: '學園傳道會「倍增門徒加油站」課程', tag: '門徒訓練', desc: '10月17日（週六）下午 1:00～5:00 於臺北靈友堂舉辦。報名截止：10月12日，請向李秀娟傳道報名。' },
      {
        num: '06',
        title: '下週主日(10/18)頒發學生獎學金',
        tag: '獎學金預告',
        isScholarship: true,
        desc: '下週主日將頒發獎學金，優良獎名單已核定：',
        awards: {
          good: ['張艾立', '周裕恩', '張敬侑', '曾義謙', '李奇勁', '金宣愛', '李侒倫', '金宣恩'],
          progress: ['李惇育']
        }
      },
      { num: '07', title: '下週日(10/18)秋季大掃除預備', tag: '大掃除預備', desc: '下週日主日崇拜後舉行全教會秋季大掃除，大掃除區域認領表已張貼，請向幹事或小家長統計人數以預備便當。' },
      { num: '08', title: '十月份長執同工會議', tag: '長執會議', desc: '今天(10月11日)主日崇拜後召開十月份長執同工會議，請長老、執事們參加，祈求父神保守會議能臻益聖工。' }
    ],
    prayers: [
      {
        id: '1515-world',
        category: 'badge-world',
        categoryName: '國際局勢代禱',
        icon: 'fa-earth-americas',
        items: [
          { num: '①', title: '中東和平代禱', desc: '求主制止美以與伊朗的緊張升級，以及胡塞武裝攻擊紅海航道。賜智慧給各國領袖，開啟真正和解之路，重獲安寧。' },
          { num: '②', title: '俄烏戰事止息', desc: '求主攔阻誤判與選舉操作的戰爭重啟，保守波灣航道與平民，賜領袖克制智慧，走上公正談判之路。' }
        ]
      },
      {
        id: '1515-health',
        category: 'badge-health',
        categoryName: '身體健康與醫治',
        icon: 'fa-heart-circle-bolt',
        items: [
          { num: '①', title: '劉時傑弟兄（憲萍姊妹女婿）', desc: '將於 10 月 23 日接受鼻中隔彎曲手術，誠請弟兄姊妹為時傑手術順利關懷代禱。' },
          { num: '②', title: '苑玲姊妹', desc: '膝關節積水已多日，請弟兄姊妹關懷代禱，期盼早日得醫治。' },
          { num: '③', title: '呂秋娥女士（慕道友）', desc: '罹患乳癌，全身疼痛無力，有意願相信耶穌，請關懷代禱。' },
          { num: '④', title: '清美姊妹', desc: '最近因暈眩在五福公園晨運時跌坐數次，請為清美姊妹身心靈健壯代禱。' }
        ]
      },
      {
        id: '1515-church',
        category: 'badge-church',
        categoryName: '教會牧養與聖工',
        icon: 'fa-church',
        items: [
          { num: '①', title: '鍾佳芯牧師實習代禱', desc: '中華福音神學院安排來自馬來西亞巴色會斗湖堂鍾佳芯牧師實習，已於週四抵台自10月10日開始實習，請為在台生活學習代禱。' },
          { num: '②', title: '聘請學生傳道', desc: '教會聘牧小組目前正在聘請學生傳道，請為尋得忠心服事的合適人選禱告。' },
          { num: '③', title: '續任傳道人', desc: '為未來（2028年4月1日）續任傳道人的聘請關懷代禱。' },
          { num: '④', title: '十月份講員代禱', desc: '18日臧自強/葉文漢牧師；25日金振群/江茂松牧師。' }
        ]
      },
      {
        id: '1515-edu',
        category: 'badge-edu',
        categoryName: '青年求學與就業',
        icon: 'fa-graduation-cap',
        items: [
          { num: '①', title: '忻慧赴紐約研習', desc: '獲教育部青年署補助赴紐約研習，請為旅途平安、生活學習及返台後合適工作代禱。' },
          { num: '②', title: '高中應屆考生學測', desc: '為奇勁、鍾羽、念恩、祖岑、鍾昀軒參加明年學測（1月22-24日）禱告。' },
          { num: '③', title: '大學應屆畢業生', desc: '宣愛中央警察大學、以諾中原資管、傅興海洋電機、奇叡清華動機、敬翔清華材料、宇謙宜蘭電子未來的就業升學代禱。宣愛明年6月將參加警察特考。' }
        ]
      },
      {
        id: '1515-military',
        category: 'badge-military',
        categoryName: '弟兄服兵役平安',
        icon: 'fa-shield-halved',
        items: [
          { num: '①', title: '金宣恩弟兄新兵訓練', desc: '於 10 月 7 日～11 月 6 日在成功嶺訓練中心接受新兵訓練，結訓後服五個月替代役，請為分發至合適單位代禱。' }
        ]
      },
      {
        id: '1515-work',
        category: 'badge-work',
        categoryName: '職場就業代禱',
        icon: 'fa-briefcase',
        items: [
          { num: '①', title: '待業弟兄姊妹工作祈求', desc: '為待業弟兄姊妹禱告，祈求父神賜與合適工作機會與剛強壯膽的心。' }
        ]
      }
    ],
    roster: {
      thisLabel: '本週 (10.11)',
      nextLabel: '下週 (10.18)',
      thisWeek: [
        { role: '講員', name: '江茂松 牧師', isHighlight: true, icon: 'fa-microphone' },
        { role: '司會', name: '馬煜堃 弟兄', icon: 'fa-user-check' },
        { role: '司樂', name: '林百加、馬旭憫', icon: 'fa-music' },
        { role: '陪唱', name: '王富次、涂秀娟、羅偉榕', icon: 'fa-guitar' },
        { role: '投影音控', name: '張豫豪、李奇叡', icon: 'fa-sliders' },
        { role: '招待', name: '董登月、黃穗蓉、楊素英', icon: 'fa-door-open' },
        { role: '聖餐', name: '王富次、涂秀娟、羅偉榕', icon: 'fa-wine-glass' },
        { role: '司獻', name: '劉岳群、馬煜堃、林百加', icon: 'fa-hand-holding-dollar' },
        { role: '插花服事', name: '王樂禾', icon: 'fa-spa' },
        { role: '兒童主日學 (10/11)', name: '魏紹霞 老師', isFull: true, icon: 'fa-children' }
      ],
      nextWeek: [
        { role: '講員', name: '葉文漢 牧師', isHighlight: true, icon: 'fa-microphone' },
        { role: '司會', name: '臧自強 弟兄', icon: 'fa-user-check' },
        { role: '司樂', name: '彭鈴玉、馬浥辰', icon: 'fa-music' },
        { role: '陪唱', name: '謝琇婷、金宣愛、傅興', icon: 'fa-guitar' },
        { role: '投影音控', name: '胡夢嵩、臧美倫', icon: 'fa-sliders' },
        { role: '招待', name: '金振群、曾繁萍、吳連碧', icon: 'fa-door-open' },
        { role: '聖餐', name: '謝琇婷、金宣愛、傅興', icon: 'fa-wine-glass' },
        { role: '司獻', name: '黃穗蓉、臧自強、馬浥辰', icon: 'fa-hand-holding-dollar' },
        { role: '插花服事', name: '王樂禾', icon: 'fa-spa' }
      ]
    },
    offering: {
      dateTitle: '10 月 04 日 奉獻／收入明細',
      tithes: [
        { id: '編號 2', amount: '$3,000' }, { id: '編號 9', amount: '$2,500' }, { id: '編號 23', amount: '$1,500' },
        { id: '編號 32', amount: '$3,000' }, { id: '編號 35', amount: '$3,000' }, { id: '編號 37', amount: '$26,000' },
        { id: '編號 74', amount: '$6,000' }, { id: '編號 75', amount: '$10,000' }, { id: '編號 82', amount: '$4,000' },
        { id: '編號 84', amount: '$6,000' }, { id: '編號 91', amount: '$5,500' }, { id: '編號 92', amount: '$3,000' },
        { id: '編號 98', amount: '$3,000' }
      ],
      titheSubtotal: '76,500',
      sundayOffering: '9,700',
      weekTotal: '86,200',
      monthTotal: '86,200'
    }
  }
};

// ==========================================
// 2. Web Audio 音效引擎 (即時合成，零外加音檔)
// ==========================================
class WebAudioSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.initAudioContext();
  }

  initAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.audioCtx = new AudioContextClass();
    }
  }

  ensureContext() {
    if (!this.audioCtx) this.initAudioContext();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // 輕柔觸控微音
  playClick() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // 祥和水晶琴鐘 (金句/經文)
  playChime() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const freqs = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
    const now = this.audioCtx.currentTime;

    freqs.forEach((freq, index) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const startTime = now + index * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.8);
    });
  }

  // 莊嚴溫暖的「阿們」三和弦 (代禱送出)
  playAmen() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    // F大調過渡至C大調和弦
    const chord = [349.23, 440.00, 523.25, 698.46]; // F4, A4, C5, F5
    const now = this.audioCtx.currentTime;

    chord.forEach((freq) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 2.2);
    });
  }

  // 歡慶豎琴撥弦琶音 (壽星祝福 / 頒獎)
  playCelebration() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.audioCtx) return;

    const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C5 ~ C6
    const now = this.audioCtx.currentTime;

    notes.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const st = now + i * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, st);

      gain.gain.setValueAtTime(0.11, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.9);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(st);
      osc.stop(st + 0.9);
    });
  }
}

const soundEngine = new WebAudioSoundEngine();
let currentIssue = '1516';

// ==========================================
// 3. 週報資料渲染引擎 (動態切換 1516 / 1515)
// ==========================================
function renderBulletin(issueKey) {
  const data = bulletinDatabase[issueKey];
  if (!data) return;
  currentIssue = issueKey;

  // 1. 首頁更新
  document.getElementById('homeIssueTitle').textContent = `埔心基督徒聚會處週報`;
  document.getElementById('homeIssueSub').textContent = `${data.dateText} • 第 ${data.issueNumber} 期`;
  document.getElementById('homeNoticeText').textContent = data.noticeText;

  // 2. 本週金句更新
  document.getElementById('verseQuoteText').textContent = data.verse.quote;
  document.getElementById('verseQuoteRef').textContent = data.verse.ref;

  // 3. 講道信息更新
  document.getElementById('homeSermonTitle').textContent = data.sermon.title;
  document.getElementById('homeSermonSpeaker').textContent = data.sermon.speaker;
  document.getElementById('homeSermonPassage').textContent = data.sermon.passage;
  document.getElementById('homeSermonDesc').textContent = data.sermon.desc;

  // 4. 壽星名冊更新
  const birthdayContainer = document.getElementById('homeBirthdayList');
  birthdayContainer.innerHTML = '';
  data.birthdays.forEach((b) => {
    const span = document.createElement('span');
    span.className = `birthday-pill ${b.highlight ? 'highlight-today' : ''}`;
    span.textContent = `${b.name} (${b.day})`;
    birthdayContainer.appendChild(span);
  });

  // 5. 崇拜同工更新
  document.getElementById('worshipSpeakerVal').textContent = data.worship.speaker;
  document.getElementById('worshipLeaderVal').textContent = data.worship.leader;
  document.getElementById('worshipPraiseVal').textContent = data.worship.praiseLeader;

  // 6. 崇拜程序時間軸動態渲染
  renderWorshipTimeline(data.worship.timeline);

  // 7. 教會消息清單渲染
  renderNewsList(data.news, data.birthdays);

  // 8. 守望代禱事項渲染
  renderPrayers(data.prayers);

  // 9. 服事表渲染
  renderRosters(data.roster);

  // 10. 奉獻徵信渲染
  renderOffering(data.offering);

  // 重置即時檢索索引
  if (window.refreshSearchIndex) {
    window.refreshSearchIndex();
  }
}

// 崇拜程序時間軸渲染
function renderWorshipTimeline(timeline) {
  const container = document.getElementById('worshipTimeline');
  container.innerHTML = '';

  timeline.forEach((item, index) => {
    const itemEl = document.createElement('div');
    const isSpecial = item.isSermon ? 'special-highlight' : item.isPraise ? 'highlight-item' : '';
    itemEl.className = `timeline-item searchable ${isSpecial}`;

    let iconOrNum = index + 1;
    if (item.isPraise) iconOrNum = '<i class="fa-solid fa-music"></i>';
    else if (item.isSermon) iconOrNum = '<i class="fa-solid fa-book-bible"></i>';

    let extraHTML = '';
    if (item.isPraise && item.hymns) {
      extraHTML = `<div class="hymn-list">` +
        item.hymns.map(h => `<div class="hymn-tag"><i class="fa-solid fa-record-vinyl"></i> ${h}</div>`).join('') +
        `</div>`;
    } else if (item.isSermon) {
      extraHTML = `<div class="sermon-badge-title">${item.sermonTitle}</div>
        <p class="item-desc">${item.passage}</p>
        <button class="expand-verse-btn" onclick="toggleScriptureModal(true)">
          <i class="fa-solid fa-book-open"></i> 展開信息經文
        </button>`;
    } else if (item.hasAccordion) {
      extraHTML = `<button class="expand-verse-btn" onclick="toggleAccordion('${item.accordionId}')">
        <i class="fa-solid fa-angle-down"></i> 查看宣召經文全文
      </button>
      <div id="${item.accordionId}" class="accordion-content hidden">
        <blockquote>${item.accordionContent}</blockquote>
      </div>`;
    } else if (item.hasSpecialAward) {
      extraHTML = `<div class="award-box">
        <span class="award-tag"><i class="fa-solid fa-award"></i> 特別表揚</span>
        <strong>${item.awardTitle}</strong>
        <p>${item.awardDesc}</p>
      </div>`;
    } else if (item.hasLordsPrayer) {
      extraHTML = `<button class="expand-verse-btn" onclick="toggleAccordion('lordsPrayerBox')">
        <i class="fa-solid fa-angle-down"></i> 展開主禱文全文
      </button>
      <div id="lordsPrayerBox" class="accordion-content hidden">
        <div class="lords-prayer-card">
          我們在天上的父：願人都尊祢的名為聖。<br>
          願祢的國降臨；願祢的旨意行在地上，如同行在天上。<br>
          我們日用的飲食，今日賜給我們。<br>
          免我們的債，如同我們免了人的債。<br>
          不叫我們遇見試探；救我們脫離兇惡。<br>
          因為國度、權柄、榮耀，全是祢的，直到永遠。阿們！
        </div>
      </div>`;
    }

    itemEl.innerHTML = `
      <div class="timeline-marker">${iconOrNum}</div>
      <div class="timeline-content">
        <div class="timeline-header">
          <span class="item-title">${item.title}</span>
          <span class="item-role">${item.role}</span>
        </div>
        ${item.desc ? `<p class="item-desc">${item.desc}</p>` : ''}
        ${extraHTML}
      </div>
    `;
    container.appendChild(itemEl);
  });
}

// 教會消息清單渲染
function renderNewsList(newsList, birthdays) {
  const container = document.getElementById('newsListContainer');
  container.innerHTML = '';

  newsList.forEach((item) => {
    const card = document.createElement('div');
    if (item.isBirthdayHighlight) {
      card.className = 'news-card searchable highlight-card';
      const pills = birthdays.map(b => `<span>${b.name} (${b.day})</span>`).join('');
      card.innerHTML = `
        <div class="news-number"><i class="fa-solid fa-gift"></i></div>
        <div class="news-content">
          <h3 class="news-title">${item.title}</h3>
          <p>祝願本月份主內壽星蒙主厚恩、年歲滿溢喜樂：</p>
          <div class="news-pills-wrap">${pills}</div>
        </div>
      `;
    } else if (item.isScholarship) {
      card.className = 'news-card searchable highlight-gold';
      const goodChips = item.awards.good.map(n => `<span class="name-chip">${n}</span>`).join('');
      const progChips = item.awards.progress.map(n => `<span class="name-chip chip-gold">${n}</span>`).join('');
      card.innerHTML = `
        <div class="news-number"><i class="fa-solid fa-graduation-cap"></i></div>
        <div class="news-content">
          <h3 class="news-title">${item.title}</h3>
          <p>${item.desc}</p>
          <div class="award-category">
            <span class="award-subtitle"><i class="fa-solid fa-star"></i> 成績優良獎：</span>
            <div class="names-row">${goodChips}</div>
          </div>
          <div class="award-category">
            <span class="award-subtitle"><i class="fa-solid fa-arrow-trend-up"></i> 成績進步獎：</span>
            <div class="names-row">${progChips}</div>
          </div>
        </div>
      `;
    } else {
      card.className = 'news-card searchable';
      card.innerHTML = `
        <div class="news-number">${item.num}</div>
        <div class="news-content">
          <h3 class="news-title">${item.title}</h3>
          <p>${item.desc}</p>
          <div class="news-tag"><i class="fa-solid fa-check"></i> ${item.tag}</div>
        </div>
      `;
    }
    container.appendChild(card);
  });
}

// 守望代禱事項渲染
function renderPrayers(prayers) {
  const container = document.getElementById('prayerCategoriesContainer');
  container.innerHTML = '';

  prayers.forEach((cat) => {
    const card = document.createElement('div');
    card.className = 'prayer-card searchable';
    card.dataset.prayerId = cat.id;

    const subItemsHTML = cat.items.map(sub => `
      <div class="sub-prayer-item">
        <span class="num-bullet">${sub.num}</span>
        <div>
          <strong>${sub.title}：</strong>
          <p>${sub.desc}</p>
        </div>
      </div>
    `).join('');

    const savedCount = parseInt(localStorage.getItem(`puxin_pray_${cat.id}`) || '0', 10);
    const displayCount = 12 + savedCount;

    card.innerHTML = `
      <div class="prayer-header">
        <div class="prayer-badge ${cat.category}">
          <i class="fa-solid ${cat.icon}"></i> ${cat.categoryName}
        </div>
        <span class="prayer-counter" id="count-${cat.id}">${displayCount} 人已代禱</span>
      </div>
      <div class="prayer-body">
        ${subItemsHTML}
      </div>
      <div class="prayer-action-row">
        <button class="pray-btn" onclick="triggerPrayer('${cat.id}', this)">
          <i class="fa-solid fa-hands-praying"></i> <span>我已同心代禱</span>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// 服事表渲染
function renderRosters(roster) {
  document.getElementById('rosterThisLabel').textContent = roster.thisLabel;
  document.getElementById('rosterNextLabel').textContent = roster.nextLabel;

  const thisGrid = document.getElementById('rosterThisGrid');
  const nextGrid = document.getElementById('rosterNextGrid');

  thisGrid.innerHTML = roster.thisWeek.map(item => `
    <div class="roster-cell searchable ${item.isFull ? 'cell-full' : ''}">
      <span class="role-title"><i class="fa-solid ${item.icon}"></i> ${item.role}</span>
      <span class="role-names ${item.isHighlight ? 'highlight-name' : ''}">${item.name}</span>
    </div>
  `).join('');

  nextGrid.innerHTML = roster.nextWeek.map(item => `
    <div class="roster-cell searchable ${item.isFull ? 'cell-full' : ''}">
      <span class="role-title"><i class="fa-solid ${item.icon}"></i> ${item.role}</span>
      <span class="role-names ${item.isHighlight ? 'highlight-name' : ''}">${item.name}</span>
    </div>
  `).join('');
}

// 奉獻徵信渲染
function renderOffering(offering) {
  document.getElementById('offeringTitle').textContent = offering.dateTitle;
  document.getElementById('offeringWeekTotal').textContent = `NT$ ${offering.weekTotal}`;
  document.getElementById('offeringMonthTotal').textContent = `NT$ ${offering.monthTotal}`;
  document.getElementById('offeringSubtotalTag').textContent = `十一奉獻小計: ${offering.titheSubtotal} 元`;

  const grid = document.getElementById('offeringGrid');
  const chipsHTML = offering.tithes.map(t => `
    <div class="offering-chip ${t.highlight ? 'highlight' : ''}">
      <span>${t.id}</span>
      <strong>${t.amount}</strong>
    </div>
  `).join('');

  const noteHTML = `
    <div class="offering-chip note">
      <span>主日奉獻</span>
      <strong>NT$ ${offering.sundayOffering}</strong>
    </div>
  `;

  grid.innerHTML = chipsHTML + noteHTML;
}

// ==========================================
// 4. 頁籤導覽 (Bottom Tab Navigation)
// ==========================================
function switchTab(tabId) {
  soundEngine.playClick();

  document.querySelectorAll('.nav-tab').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  document.querySelectorAll('.tab-pane').forEach((pane) => {
    pane.classList.remove('active');
  });

  const targetPane = document.getElementById(`section-${tabId}`);
  if (targetPane) {
    targetPane.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ==========================================
// 5. 字級調整系統 (長輩友善大字體)
// ==========================================
function initFontSizeController() {
  const fontSizeBtn = document.getElementById('fontSizeBtn');
  const fontDropdown = document.getElementById('fontDropdown');
  const options = fontDropdown.querySelectorAll('button');

  const savedSize = localStorage.getItem('puxin_font_size') || 'font-size-md';
  document.body.className = savedSize;

  options.forEach((opt) => {
    opt.classList.toggle('active', opt.dataset.size === savedSize);
  });

  fontSizeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fontDropdown.classList.toggle('hidden');
    soundEngine.playClick();
  });

  options.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedSize = btn.dataset.size;
      document.body.className = selectedSize;
      localStorage.setItem('puxin_font_size', selectedSize);

      options.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      fontDropdown.classList.add('hidden');

      showToast('字體大小已切換');
      soundEngine.playClick();
    });
  });

  document.addEventListener('click', () => {
    fontDropdown.classList.add('hidden');
  });
}

// ==========================================
// 6. 音效開關 (Web Audio)
// ==========================================
function initSoundToggle() {
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const icon = soundToggleBtn.querySelector('i');

  soundToggleBtn.addEventListener('click', () => {
    soundEngine.soundEnabled = !soundEngine.soundEnabled;
    if (soundEngine.soundEnabled) {
      icon.className = 'fa-solid fa-volume-high';
      soundToggleBtn.style.color = '#d97706';
      showToast('已開啟互動音效 🔔');
      soundEngine.playChime();
    } else {
      icon.className = 'fa-solid fa-volume-xmark';
      soundToggleBtn.style.color = '#94a3b8';
      showToast('已關閉音效 🔇');
    }
  });
}

// ==========================================
// 7. 即時全站搜尋與關鍵字高亮
// ==========================================
function initSearchEngine() {
  const searchTriggerBtn = document.getElementById('searchTriggerBtn');
  const searchContainer = document.getElementById('searchContainer');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const searchStats = document.getElementById('searchStats');
  const matchCount = document.getElementById('matchCount');

  let searchableElements = [];
  let originalHTMLs = new Map();

  window.refreshSearchIndex = () => {
    searchableElements = Array.from(document.querySelectorAll('.searchable'));
    originalHTMLs.clear();
    searchableElements.forEach((el, index) => {
      originalHTMLs.set(index, el.innerHTML);
    });
  };
  window.refreshSearchIndex();

  searchTriggerBtn.addEventListener('click', () => {
    searchContainer.classList.toggle('hidden');
    if (!searchContainer.classList.contains('hidden')) {
      searchInput.focus();
    }
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
      searchClearBtn.classList.remove('hidden');
      performSearch(query);
    } else {
      searchClearBtn.classList.add('hidden');
      resetSearch();
    }
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchClearBtn.classList.add('hidden');
    resetSearch();
    searchInput.focus();
  });

  function performSearch(query) {
    let matches = 0;
    searchableElements.forEach((el, index) => {
      const orig = originalHTMLs.get(index) || el.innerHTML;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = orig;
      const textContent = tempDiv.textContent || tempDiv.innerText;

      if (textContent.toLowerCase().includes(query.toLowerCase())) {
        matches++;
        highlightNodeText(el, orig, query);
        el.style.border = '2px solid #f59e0b';
        el.style.boxShadow = '0 0 10px rgba(245, 158, 11, 0.25)';
      } else {
        el.innerHTML = orig;
        el.style.border = '';
        el.style.boxShadow = '';
      }
    });

    searchStats.classList.remove('hidden');
    matchCount.textContent = matches;
  }

  function resetSearch() {
    searchableElements.forEach((el, index) => {
      const orig = originalHTMLs.get(index);
      if (orig) el.innerHTML = orig;
      el.style.border = '';
      el.style.boxShadow = '';
    });
    searchStats.classList.add('hidden');
  }

  function highlightNodeText(element, originalHTML, query) {
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const reg = new RegExp(`(${safeQuery})(?![^<]*>|[^<>]*<\/)`, 'gi');
    element.innerHTML = originalHTML.replace(reg, '<mark class="search-highlight">$1</mark>');
  }
}

// ==========================================
// 8. 期數切換器初始化
// ==========================================
function initIssueSelector() {
  const issueSelect = document.getElementById('issueSelect');
  issueSelect.addEventListener('change', (e) => {
    const selectedKey = e.target.value;
    soundEngine.playChime();
    renderBulletin(selectedKey);
    showToast(`已切換至第 ${selectedKey} 期週報`);
  });
}

// ==========================================
// 9. 服事輪值本週與下週切換
// ==========================================
function switchRosterWeek(week) {
  soundEngine.playClick();
  const btnThis = document.getElementById('btnWeekThis');
  const btnNext = document.getElementById('btnWeekNext');
  const viewThis = document.getElementById('rosterThisWeek');
  const viewNext = document.getElementById('rosterNextWeek');

  if (week === 'this') {
    btnThis.classList.add('active');
    btnNext.classList.remove('active');
    viewThis.classList.add('active');
    viewNext.classList.remove('active');
  } else {
    btnNext.classList.add('active');
    btnThis.classList.remove('active');
    viewNext.classList.add('active');
    viewThis.classList.remove('active');
  }
}

// ==========================================
// 10. 守望代禱 (阿們音效 + 飛升愛心微動畫)
// ==========================================
function triggerPrayer(prayerId, buttonElement) {
  soundEngine.playAmen();

  const storageKey = `puxin_pray_${prayerId}`;
  let count = parseInt(localStorage.getItem(storageKey) || '0', 10);
  count++;
  localStorage.setItem(storageKey, count);

  const counterEl = document.getElementById(`count-${prayerId}`);
  if (counterEl) {
    counterEl.textContent = `${12 + count} 人已代禱 🙏`;
  }

  buttonElement.classList.add('prayed');
  const origText = buttonElement.querySelector('span').textContent;
  buttonElement.querySelector('span').textContent = '已同心代禱';

  createFloatingHeart(buttonElement);
  showToast('感謝您的守望代禱，願主垂聽並賜福！');

  setTimeout(() => {
    buttonElement.querySelector('span').textContent = origText;
    buttonElement.classList.remove('prayed');
  }, 2800);
}

function createFloatingHeart(targetBtn) {
  const rect = targetBtn.getBoundingClientRect();
  const heart = document.createElement('div');
  heart.className = 'floating-prayer-heart';
  heart.innerHTML = '❤️ ✝️';
  heart.style.left = `${rect.left + rect.width / 2}px`;
  heart.style.top = `${rect.top}px`;
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1200);
}

// ==========================================
// 11. 壽星祝福彩帶特效 (Confetti)
// ==========================================
function initBirthdayBlessing() {
  const blessBtn = document.getElementById('birthdayBlessBtn');
  if (!blessBtn) return;

  blessBtn.addEventListener('click', () => {
    soundEngine.playCelebration();
    showToast('🎂 願耶和華賜福十月份壽星，恩惠與慈愛一生相隨！');

    if (window.confetti) {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24']
      });
    }
  });
}

// ==========================================
// 12. 本週金句互動 (鐘聲與複製)
// ==========================================
function initVerseInteractions() {
  const playAudioBtn = document.getElementById('playVerseAudioBtn');
  const copyBtn = document.getElementById('copyVerseBtn');

  if (playAudioBtn) {
    playAudioBtn.addEventListener('click', () => {
      soundEngine.playChime();
      showToast('🔔 祥和琴鐘：願神的話語成為今日的力量');
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const data = bulletinDatabase[currentIssue];
      const copyText = `${data.verse.quote} (${data.verse.ref}) —— 埔心基督徒聚會處第${data.issueNumber}期週報`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText).then(() => {
          soundEngine.playClick();
          showToast('✅ 金句已複製，可分享至 LINE 或社群！');
        });
      } else {
        showToast(data.verse.quote);
      }
    });
  }
}

// ==========================================
// 13. 收合/展開 Accordion & Modal
// ==========================================
function toggleAccordion(id) {
  soundEngine.playClick();
  const el = document.getElementById(id);
  if (el) el.classList.toggle('hidden');
}

function toggleScriptureModal(show = true) {
  soundEngine.playClick();
  const modal = document.getElementById('scriptureModal');
  const titleEl = document.getElementById('scriptureModalTitle');
  const contentEl = document.getElementById('scriptureModalContent');

  if (modal && show) {
    const data = bulletinDatabase[currentIssue];
    titleEl.innerHTML = `<i class="fa-solid fa-bible"></i> ${data.verse.contextTitle}`;
    contentEl.textContent = data.verse.contextText;
    modal.classList.remove('hidden');
  } else if (modal) {
    modal.classList.add('hidden');
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') toggleScriptureModal(false);
});

// ==========================================
// 14. 輕量 Toast 彈跳提示
// ==========================================
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('appToast');
  const msgEl = document.getElementById('toastMsg');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('hidden');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2500);
}

// ==========================================
// 15. 初始化
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initFontSizeController();
  initSoundToggle();
  initIssueSelector();
  initBirthdayBlessing();
  initVerseInteractions();

  // 預設渲染第 1516 期 (最新出刊)
  renderBulletin('1516');
  initSearchEngine();

  console.log('埔心基督徒聚會處互動式週報系統 (第1516期/1515期) 初始化完成。');
});
