import { shallowMount } from '@vue/test-utils'
import PDFViewer from '@/components/PDFViewer.vue'

describe('PDFViewer.vue', () => {
  it('pass a fake test', () => {
    const src = 'fake.url'
    const wrapper = shallowMount(PDFViewer, {
      props: { src }
    })
    expect(wrapper.props().src).toMatch(src)
  })
})
