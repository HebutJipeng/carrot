axios.interceptors.response.use(
  function(res) {
    // 在发送请求之前做些什么
    let { data } = res
    return data;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

var app = new Vue({
  el: "#app",
  data: {
    langs: "cn", // cn - en
    form: {
      name: "",
      mobile: "",
      company: "",
      area: "",
      industry: ""
    },
    formTpl: {
      name: "",
      mobile: "",
      company: "",
      area: "",
      industry: ""
    },
    province: province,
    industry: industry,
    show: false,
    showText: "请填写必填项",
    step: 0,
    pics: []
  },
  computed: {
    connetUs() {
      return this.langs === "cn"
        ? "/public/image/us.png"
        : "/public/image/us_en.png";
    },
    next() {
      return this.langs === "cn"
        ? "/public/image/next.png"
        : "/public/image/next_en.png";
    }
  },
  methods: {
    langsChange() {
      this.langs = this.langs === "cn" ? "en" : "cn";
      this.form = JSON.parse(JSON.stringify(this.formTpl));
    },
    submit() {
      let times = this.getTimes()
      console.log('times ==>', times)
      if (times >= 3) {
        this.showText =
          this.langs === "cn"
            ? "超过单个设备最多请求次数"
            : "More than a single device maximum request count";
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 1500);
        return;
      }

      let data = {};
      if (this.langs === "en") {
        this.form.area = "haiwai";
      }

      if (!(/^\d+$/g.test(this.form.mobile))) {
        this.showText =
          this.langs === "cn"
            ? "请填写正确手机号"
            : "Please fill in the correct mobile number";
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 1500);
        return;
      }

      if (
        !this.form.name ||
        !this.form.mobile ||
        !this.form.company ||
        !this.form.area
      ) {
        this.showText =
          this.langs === "cn"
            ? "请填写必填项"
            : "Please fill in the required fields";
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 1500);
        return;
      }

      data = Object.assign({}, this.form, data);
      axios
        .post("/user/create", data)
        .then(res => {
          if (res.code === 0) {
            this.step = 1;
            this.pics = res.data;
            this.setTimes(++times)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getTimes() {
      return parseInt(window.localStorage.getItem("request_times") || 0);
    },
    setTimes(n) {
      console.log(n)
      window.localStorage.setItem('request_times', n.toString())
    }
  }
});
