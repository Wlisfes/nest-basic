<script lang="tsx">
import { defineComponent, ref, onMounted, computed, Fragment, type PropType, type CSSProperties } from 'vue'
import { useVModels } from '@vueuse/core'
import { NestBlock, type NestOption } from '@/utils/utils-mailer'

export default defineComponent({
    name: 'ElementSection',
    props: {
        node: { type: Object as PropType<NestOption>, required: true }
    },
    setup(props, { emit }) {
        const { node } = useVModels(props, emit)
        const elementSection = computed<CSSProperties>(() => ({
            direction: 'ltr',
            fontSize: '0px',
            padding: '20px 0px',
            textAlign: 'center',
            border: 'none'
        }))

        return () => (
            <div class="mj-section element-section" style={elementSection.value}>
                {node.value.children && node.value.children.length > 0 && (
                    <Fragment>
                        {node.value.children.map(item => (
                            <element-component key={item.uid} v-model:node={item}></element-component>
                        ))}
                    </Fragment>
                )}

                {/* {node.value.tagName === NestBlock.MJ_COLUMN ? (
                    <element-column
                        v-model:node={node.value}
                        v-slots={{
                            default: () => (
                                <Fragment>
                                    {(node.value.children ?? []).map(item => (
                                        <element-section key={node.value.uid} v-model:node={item}></element-section>
                                    ))}
                                </Fragment>
                            )
                        }}
                    ></element-column>
                ) : node.value.tagName === NestBlock.MJ_TEXT ? (
                    <element-text v-model:node={node.value}></element-text>
                ) : node.value.tagName === NestBlock.MJ_BUTTON ? (
                    <element-button v-model:node={node.value}></element-button>
                ) : node.value.tagName === NestBlock.MJ_IMAGE ? (
                    <element-image v-model:node={node.value}></element-image>
                ) : node.value.tagName === NestBlock.MJ_DIVIDER ? (
                    <element-divider v-model:node={node.value}></element-divider>
                ) : node.value.tagName === NestBlock.MJ_SOCIAL ? (
                    <element-social v-model:node={node.value}></element-social>
                ) : node.value.tagName === NestBlock.MJ_NAVBAR ? (
                    <element-navbar v-model:node={node.value}></element-navbar>
                ) : node.value.tagName === NestBlock.MJ_HERO ? (
                    <element-hero v-model:node={node.value}></element-hero>
                ) : node.value.tagName === NestBlock.MJ_WRAPPER ? (
                    <element-wrapper v-model:node={node.value}></element-wrapper>
                ) : null} */}
            </div>
        )
    }
})
</script>
