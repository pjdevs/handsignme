import { shallowMount } from '@vue/test-utils'
import PDFViewer from '@/components/PDFViewer.vue'

describe('PDFViewer.vue', () => {
  it('pass a fake test', () => {
    const url = 'fake url'
    const wrapper = shallowMount(PDFViewer, {
      props: { url }
    })
    expect(wrapper.props().url).toMatch(url)
  })
})
