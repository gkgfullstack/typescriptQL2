import React from 'react';
import { shallow } from 'enzyme';
import ProductDescription from './ProductDescription';

import useDescriptionViewState from './hooks/useDescriptionViewState';
import ViewState from './hooks/ViewState';

import styles from './ProductDescription.module.less';

const props = {
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quia non fuga debitis illum inventore dolor vel cum adipisci soluta accusamus facere voluptatum ipsum, explicabo ducimus ea at quaerat distinctio, vero nulla perspiciatis nesciunt! Iure dolores explicabo iste libero accusantium, ipsam optio, repellendus asperiores sit dignissimos blanditiis. Quibusdam qui eligendi suscipit ipsa fugiat molestias cumque voluptate in consequuntur dolore, quo voluptas praesentium dicta beatae possimus officia, alias quis unde. Cum accusantium exercitationem deleniti ducimus ipsa aliquid aut animi? Ipsam, ducimus? Quasi quaerat accusamus sunt commodi, eveniet vero expedita maxime veritatis qui, dignissimos incidunt reprehenderit natus inventore ea possimus aut laudantium iusto quidem magni aperiam eos recusandae soluta. Saepe ducimus, nihil cumque porro ipsum rem eligendi reprehenderit voluptates ut quia, obcaecati facere natus tempora quaerat vitae beatae consequatur. Earum ullam maiores consectetur culpa rem libero officia nemo quibusdam quam. Ad eos modi, accusamus quia quidem aperiam quis tempora suscipit voluptates velit similique, magni consequatur, odio dolorum odit quaerat. Quo reiciendis consequatur inventore quod adipisci iusto praesentium aliquam minima consequuntur ad eligendi iure voluptatum nemo quidem ut, commodi molestiae quaerat. Quae quos ipsa aut possimus sapiente, qui accusamus nulla quaerat dolore aspernatur temporibus mollitia repellendus commodi quo modi, fuga laborum quis quod reiciendis officia a! Facere consequuntur quasi ex suscipit excepturi praesentium illo voluptatibus nostrum dolore amet. Explicabo exercitationem totam earum voluptate! Molestias magni, aspernatur tempora minus amet culpa? Corporis nostrum tempore quidem libero. Inventore rem recusandae itaque laboriosam. Eligendi ipsum nihil, nostrum consequuntur quis assumenda. Ipsam dolore non mollitia perferendis cumque deleniti saepe officia qui, expedita amet suscipit dolor modi delectus aperiam officiis laborum veritatis tempore minus provident numquam soluta quasi tenetur! Sed, impedit enim voluptatibus expedita suscipit ipsam voluptatem iste perferendis eveniet neque libero illo eum doloribus? Suscipit sapiente quis, blanditiis eum repudiandae adipisci minus facilis voluptatem! Asperiores ut nemo assumenda totam? Architecto ratione cumque inventore magnam blanditiis nulla eos sapiente excepturi, incidunt velit totam. Illo minima ea ullam optio iusto quis explicabo nemo cupiditate, veniam, veritatis enim laudantium laboriosam. Non repudiandae eos mollitia cupiditate tempora eligendi dignissimos facilis. Quos.',
  className: 'some_class_name',
};

jest.mock('./hooks/useDescriptionViewState');

const hookMock = useDescriptionViewState as jest.Mock;

const collapse = jest.fn();
const expand = jest.fn();

const mockHookReturnValueOnce = (viewState: ViewState): void => {
  hookMock.mockReturnValueOnce([viewState, collapse, expand]);
};

describe('ProductDescription component', () => {
  it('renders without crashing', () => {
    mockHookReturnValueOnce(ViewState.Collapsed);
    shallow(<ProductDescription {...props} />);
  });

  it('applies props correcty', () => {
    mockHookReturnValueOnce(ViewState.Collapsed);

    const wrapper = shallow(<ProductDescription {...props} />);
    expect(wrapper.find(`.${styles.description}`).text()).toEqual(props.children);
    expect(wrapper.find(`.${styles.description_container}`).hasClass(props.className)).toBe(true);
  });

  describe(`renders button depending on the hook's return value`, () => {
    it(`renders no buttons if fits`, () => {
      mockHookReturnValueOnce(ViewState.Fits);
      expect(
        shallow(<ProductDescription {...props} />)
          .find(`.${styles.toggle_text}`)
          .exists()
      ).toBe(false);
    });

    it('renders Show More button if collapsed', () => {
      mockHookReturnValueOnce(ViewState.Collapsed);
      expect(
        shallow(<ProductDescription {...props} />)
          .find(`.${styles.toggle_text}`)
          .text()
      ).toBe('Show More');
    });

    it('renders Show Less button if expanded', () => {
      mockHookReturnValueOnce(ViewState.Expanded);
      expect(
        shallow(<ProductDescription {...props} />)
          .find(`.${styles.toggle_text}`)
          .text()
      ).toBe('Show Less');
    });
  });

  describe(`calls appropriate callback on button click`, () => {
    it('calls collapse callback on button click when expanded', () => {
      mockHookReturnValueOnce(ViewState.Expanded);
      expect(collapse.mock.calls.length).toBe(0);
      shallow(<ProductDescription {...props} />)
        .find(`.${styles.button}`)
        .simulate('click');
      expect(collapse.mock.calls.length).toBe(1);
    });

    it('calls expand callback on button click when collapsed', () => {
      mockHookReturnValueOnce(ViewState.Collapsed);
      expect(expand.mock.calls.length).toBe(0);
      shallow(<ProductDescription {...props} />)
        .find(`.${styles.button}`)
        .simulate('click');
      expect(expand.mock.calls.length).toBe(1);
    });
  });
});
