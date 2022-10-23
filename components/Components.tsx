import { useQuery, gql } from '@apollo/client';
import { InnerComponent } from './InnerComponent';
import { ThemeProvider } from "styled-components";
import { CSSreset } from "../styles/CssReset";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getData } from '../actions';
import theme from "../styles/Theme";

export const COMPONENTS_QUERY = gql`
  query GetComponents {
    component(id: 1) {
      data {
        id,
        attributes {
          component {
            id,
            title,
            subtitle,
            context,
            content {
              title,
              subtitle,
              image
            }
          }
        }
      }
    }
  }
`;

export default function Components() {
  const { data, loading, error } = useQuery(COMPONENTS_QUERY);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const allComponents = data?.component.data.attributes.component;
      dispatch(getData(allComponents));
    }
  }, [data]);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) {
    console.error(error);
    return `Error ${error.message}`;
  }

  return (
    <ThemeProvider theme={theme}>
      <CSSreset />
      <InnerComponent />
    </ThemeProvider>
  );
};