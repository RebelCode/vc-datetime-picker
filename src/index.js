export function CfDatetimePicker (Vue) {
    return Vue.extend({
        props: {
            /**
             * @var {int} Timestamp in milliseconds, passed via v-model
             */
            value: {},

            /**
             * @var {String}  Locale to use with Date
             */
            locale: {
                type: String,
                default: 'en-US'
            }
        },

        computed: {
            /**
             * Force consumer to implement getter and setter for timeValue
             * ONLY if consumer wants to use it.
             */
            timeValue: {
                get () {
                    return this.nativeDate.getUTCHours()
                        + ':' + this.nativeDate.getUTCMinutes()
                        + ':' + this.nativeDate.getUTCSeconds()
                },

                set (newValue) {
                    throw new Error('Implement computed timeValue setter in your extended datetime-picker.')
                }
            },

            /**
             * Force consumer to implement getter and setter for dateValue
             * ONLY if consumer wants to use it.
             */
            dateValue: {
                get () {
                    return this.nativeDate.toISOString().substring(0, 10) // YYYY-MM-DD format
                },

                set (newValue) {
                    throw new Error('Implement computed dateValue setter in your extended datetime-picker.')
                }
            },

            /**
             * Wrapper for timestamp for simpler API
             *
             * @return {Date}
             */
            nativeDate () {
                return new Date(this.value)
            }
        },

        methods: {
            /**
             * Set current component value (that binded to v-model).
             *
             * @param {int} newValue  New value of this component.
             * @private
             */
            _setValue (newValue) {
                this.$emit('input', newValue)
            },

            /**
             * Get formatted datetime.
             *
             * @param {object} options  Format options to format date string (using native toLocaleDateString).
             * @return {string}
             */
            format (options = {}) {
                return this.nativeDate.toLocaleDateString(this.locale, options)
            }
        }
    })
}
