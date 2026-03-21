from elem import Elem, Text
from elements import (Html, Head, Body, Title, Meta, Img, Table, Th, Tr, Td, 
                      Ul, Ol, Li, H1, H2, P, Div, Span, Hr, Br)

class Page:
    """
    Represents an HTML page with structural validation according to
    specific Django Piscine OOB rules.
    """
    def __init__(self, elem):
        """Initializes the Page with a root Elem instance."""
        if not isinstance(elem, Elem):
             raise TypeError("Page must be initialized with an Elem instance.")
        self.elem = elem

    def is_valid(self):
        """Verifies if the stored Elem tree is structurally valid."""
        return self._is_recursive_valid(self.elem)

    def _is_recursive_valid(self, elem):
        """
        Recursively checks each node against the permitted tags and
        parent-child relationship rules.
        """
        # Rule 1: Node type check - only specific classes and Text are allowed
        allowed_types = (Html, Head, Body, Title, Meta, Img, Table, Th, Tr, Td, 
                         Ul, Ol, Li, H1, H2, P, Div, Span, Hr, Br, Text)
        if not isinstance(elem, allowed_types):
            return False

        # If it's Text, it's valid (leaf node)
        if isinstance(elem, Text):
            return True

        # Check content recursively before checking the current node's rules
        for child in elem.content:
            if not self._is_recursive_valid(child):
                return False

        # Rule-specific tag constraints
        tag = elem.tag
        content = elem.content
        
        if isinstance(elem, Html):
            # Rule: Html must contain exactly [Head, Body]
            if len(content) != 2: return False
            if not isinstance(content[0], Head) or not isinstance(content[1], Body):
                return False

        elif isinstance(elem, Head):
            # Rule: Head must contain exactly one Title
            if len(content) != 1 or not isinstance(content[0], Title):
                return False

        elif isinstance(elem, (Body, Div)):
            # Rule: Body and Div can only contain layout/text elements
            body_allowed = (H1, H2, Div, Table, Ul, Ol, Span, Text)
            if not all(isinstance(c, body_allowed) for c in content):
                return False

        elif isinstance(elem, (Title, H1, H2, Li, Th, Td)):
            # Rule: These tags must contain exactly one Text node
            if len(content) != 1 or not isinstance(content[0], Text):
                return False

        elif isinstance(elem, P):
            # Rule: P tags can only contain Text nodes
            if not all(isinstance(c, Text) for c in content):
                return False

        elif isinstance(elem, Span):
            # Rule: Span can contain Text or P tags
            if not all(isinstance(c, (Text, P)) for c in content):
                return False

        elif isinstance(elem, (Ul, Ol)):
            # Rule: Lists must contain at least one Li and only Li tags
            if len(content) < 1 or not all(isinstance(c, Li) for c in content):
                return False

        elif isinstance(elem, Tr):
            # Rule: Tr must contain at least one cell; cells must be all Th or all Td
            if len(content) < 1: return False
            first_type = type(content[0])
            if first_type not in (Th, Td): return False
            if not all(isinstance(c, first_type) for c in content):
                return False

        elif isinstance(elem, Table):
            # Rule: Table can only contain Tr tags
            if not all(isinstance(c, Tr) for c in content):
                return False

        return True

    def __str__(self):
        res = ""
        if isinstance(self.elem, Html):
            res += "<!DOCTYPE html>\n"
        res += str(self.elem)
        return res

    def write_to_file(self, filename):
        with open(filename, "w") as f:
            f.write(str(self))

if __name__ == '__main__':
    # Test valid page
    valid_html = Html([
        Head(Title(Text('Hello World'))),
        Body([
            H1(Text('Title')),
            Div([
                P(Text('Para')),
                Span([Text('Span'), P(Text('Nested P'))])
            ])
        ])
    ])
    page = Page(valid_html)
    print(f"Valid page is_valid: {page.is_valid()}")
    
    # Test invalid page (Span containing Div)
    invalid_html = Html([
        Head(Title(Text('Fail'))),
        Body(Div(Span(Div(Text('Broken')))))
    ])
    page_fail = Page(invalid_html)
    print(f"Invalid page is_valid: {page_fail.is_valid()}")
