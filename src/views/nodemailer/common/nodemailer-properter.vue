<script lang="tsx">
import { defineComponent, Fragment, type PropType } from 'vue'
import { compute, sompute } from '@/utils/utils-compute'
import { divineTransfer } from '@/utils/utils-common'
import { whereProperter, createElement } from '@/utils/utils-layout'
import type { BundleMailer } from '@/interface/mailer.resolver'

export default defineComponent({
    name: 'MailerProperter',
    props: {
        // node: { type: Object as PropType<BundleMailer>, required: true }
    },
    setup() {
        return () => <n-element class="element-properter"></n-element>
    }
})
</script>

<style lang="scss" scoped>
.element-properter {
    position: relative;
    width: 360px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--card-color);
}
</style>
