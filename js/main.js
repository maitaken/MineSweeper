var app = new Vue({
    el: '#app',
    data: {
        bomField: [],
        numberField: [],
        N: 10
    },
    methods: {
        fieldClickAction: function (row, col) {
            if (this.bomField[row][col])
                alert("Bom")
        },
        createFieldNumber: function () {
            var falseLine = new Array(this.N + 2).fill(false)
            tmpField = []
            tmpField.push(falseLine)

            for (i = 0; i < this.N; i++) {
                line = [false]
                line = this.bomField[i].conocat(line)
                line.push(false)
            }

            tmpField.push(falseLine)
            console.log(falseLine)

        }
    },
    created: function () {
        for (i = 0; i < this.N; i++) {
            var line = []
            for (j = 0; j < this.N; j++) {
                if (Math.random() < 0.3)
                    line.push(1)
                else
                    line.push(0)
            }
            this.bomField.push(line)
        }

        this.createFieldNumber()



    }
})